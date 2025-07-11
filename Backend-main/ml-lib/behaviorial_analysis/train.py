#!/usr/bin/env python3

import torch
import torchvision

from torch.utils.data import Dataset, random_split
from config import device

import BAUtils

class DatasetFromSubset(Dataset):
    def __init__(self, subset, transform=None):
        self.subset = subset
        self.transform = transform

    def __getitem__(self, index):
        x, y = self.subset[index]
        if self.transform:
            x = self.transform(x)
        return x, y

    def __len__(self):
        return len(self.subset)

# Test network on validation set, if it exists.
def test_network(net,testloader):
    net.eval()
    total_images = 0
    total_correct = 0
    with torch.no_grad():
        for data in testloader:
            images, labels = data
            images = images.to(device)
            labels = labels.to(device)
            outputs = net(images)
            _, predicted = torch.max(outputs.data, 1)
            total_images += labels.size(0)
            total_correct += (predicted == labels).sum().item()

    model_accuracy = total_correct / total_images * 100
    print('      Accuracy on {0} test images: {1:.2f}%'.format(
                                total_images, model_accuracy))
    net.train()

def main():
    print("Using device: {}"
          "\n".format(str(device)))
    ########################################################################
    #######                      Loading Data                        #######
    ########################################################################
    data = torchvision.datasets.ImageFolder(root=BAUtils.dataset)
    
    if BAUtils.train_val_split == 1:
        # Train on the entire dataset
        data = torchvision.datasets.ImageFolder(root=BAUtils.dataset,
                            transform=BAUtils.transform('train'))
        trainloader = torch.utils.data.DataLoader(data,
                            batch_size=BAUtils.batch_size, shuffle=True);
    else:
        # Split the dataset into trainset and testset
        data = torchvision.datasets.ImageFolder(root=BAUtils.dataset)
        data.len=len(data)
        train_len = int((BAUtils.train_val_split)*data.len)
        test_len = data.len - train_len
        train_subset, test_subset = random_split(data, [train_len, test_len])
        trainset = DatasetFromSubset(
            train_subset, transform=BAUtils.transform('train'))
        testset = DatasetFromSubset(
            test_subset, transform=BAUtils.transform('test'))

        trainloader = torch.utils.data.DataLoader(trainset, 
                            batch_size=BAUtils.batch_size, shuffle=False)
        testloader = torch.utils.data.DataLoader(testset, 
                            batch_size=BAUtils.batch_size, shuffle=False)

    # Get model, loss criterion and optimiser from BAUtils.
    net = BAUtils.net.to(device)
    criterion = BAUtils.lossFunc
    optimiser = BAUtils.optimiser

    ########################################################################
    #######                        Training                          #######
    ########################################################################
    print("Start training...")
    for epoch in range(1,BAUtils.epochs+1):
        total_loss = 0
        total_images = 0
        total_correct = 0

        for batch in trainloader:           # Load batch
            images, labels = batch 
            images = images.to(device)
            labels = labels.to(device)

            preds = net(images)             # Process batch
            
            loss = criterion(preds, labels) # Calculate loss

            optimiser.zero_grad()
            loss.backward()                 # Calculate gradients
            optimiser.step()                # Update weights

            output = preds.argmax(dim=1)

            total_loss += loss.item()
            total_images += labels.size(0)
            total_correct += output.eq(labels).sum().item()

        model_accuracy = total_correct / total_images * 100
        print('epoch {0} total_correct: {1} loss: {2:.2f} acc: {3:.2f}'.format(
                   epoch,total_correct, total_loss, model_accuracy) )

        if epoch % 10 == 0:
            if BAUtils.train_val_split < 1:
                test_network(net,testloader)
            torch.save(net.state_dict(), 'checkModel.pth')
            print("      Model saved to checkModel.pth")

    if BAUtils.train_val_split < 1:
        test_network(net,testloader)
    torch.save(net.state_dict(), 'savedModel.pth')
    print("   Model saved to savedModel.pth")
    
if __name__ == '__main__':
    main()
