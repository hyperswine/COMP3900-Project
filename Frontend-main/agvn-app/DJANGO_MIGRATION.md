# AGVN Django Frontend Migration Guide

## Converting Next.js/React to Django Templates + HTMX + Alpine.js + Tailwind CSS

### Table of Contents

1. [Migration Overview](#migration-overview)
2. [Technology Stack Comparison](#technology-stack-comparison)
3. [Django Template Structure](#django-template-structure)
4. [Core Component Conversions](#core-component-conversions)
5. [Page Conversions](#page-conversions)
6. [State Management with Alpine.js](#state-management-with-alpinejs)
7. [Dynamic Updates with HTMX](#dynamic-updates-with-htmx)
8. [Authentication & Session Management](#authentication--session-management)
9. [Form Handling](#form-handling)
10. [Implementation Strategy](#implementation-strategy)

## Migration Overview

This document outlines how to convert the existing Next.js/React AGVN frontend to a Django template-based frontend using modern web technologies that provide similar functionality with less JavaScript complexity.

### Why This Migration?

- **Backend Integration**: Seamless integration with Django backend
- **Reduced Complexity**: Less JavaScript overhead, simpler state management
- **Server-Side Rendering**: Better SEO and initial page load performance
- **Progressive Enhancement**: Works without JavaScript, enhanced with it
- **Simplified Deployment**: Single Django application

## Technology Stack Comparison

### Current Stack → New Stack

| Current (Next.js/React) | New (Django) | Purpose |
|------------------------|--------------|---------|
| React Components | Django Templates + Alpine.js | UI Components |
| React State | Alpine.js Stores | State Management |
| Axios API Calls | HTMX | Dynamic Updates |
| Next.js Router | Django URLs | Routing |
| React Hook Form | Django Forms + Alpine.js | Form Handling |
| Chart.js | Chart.js (unchanged) | Data Visualization |
| Tailwind CSS | Tailwind CSS (unchanged) | Styling |
| TypeScript | Python + Minimal JS | Type Safety |

## Django Template Structure

### Base Template Architecture

```
templates/
├── base.html                    # Main layout template
├── components/                  # Reusable template components
│   ├── header.html             # Navigation header
│   ├── footer.html             # Site footer
│   ├── banner.html             # Page banners
│   ├── cards/                  # Card components
│   │   ├── department_card.html
│   │   ├── policy_card.html
│   │   └── info_card.html
│   ├── forms/                  # Form components
│   │   ├── vote_form.html
│   │   ├── feedback_form.html
│   │   └── auth_forms.html
│   └── modals/                 # Modal dialogs
│       ├── policy_modal.html
│       └── department_modal.html
├── pages/                      # Page templates
│   ├── home.html
│   ├── about.html
│   ├── departments.html
│   ├── vote.html
│   ├── policies.html
│   └── profile.html
└── partials/                   # HTMX partial templates
    ├── department_grid.html
    ├── vote_results.html
    └── notification_list.html
```

## Core Component Conversions

### 1. TheLayout Component → base.html

**Current React Component:**
```jsx
const TheLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
      <ChatWidget />
    </div>
  )
}
```

**Django Template Conversion:**
```html
<!-- templates/base.html -->
<!DOCTYPE html>
<html lang="en" x-data="{ darkMode: false }" :class="{ 'dark': darkMode }">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% block title %}AGVN - Australian Government Virtual Network{% endblock %}</title>

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Alpine.js -->
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>

    <!-- HTMX -->
    <script src="https://unpkg.com/htmx.org@1.9.6"></script>

    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body class="bg-gray-50 min-h-screen">
    {% include 'components/header.html' %}

    <main>
        {% block content %}{% endblock %}
    </main>

    {% include 'components/footer.html' %}
    {% include 'components/chat_widget.html' %}

    <!-- Toast notifications -->
    <div id="toast-container" class="fixed top-4 right-4 z-50"></div>
</body>
</html>
```

### 2. TheHeader Component → header.html

**Current React Component Features:**
- Multi-level navigation
- Mobile menu toggle
- Authentication state
- Theme toggle
- Notifications

**Django Template Conversion:**
```html
<!-- templates/components/header.html -->
<header x-data="headerData()" class="bg-gray-800 text-gray-300 shadow-lg">
    <!-- Top Navigation -->
    <div class="container mx-auto px-4 py-2">
        <div class="flex justify-between items-center">
            <a href="{% url 'home' %}" class="flex items-center">
                <img src="{% static 'assets/AGVN_white_transparent.png' %}"
                     class="w-20 h-15 rounded-lg hover:scale-110 transition-transform"
                     alt="AGVN Logo">
            </a>

            <!-- Desktop Navigation -->
            <nav class="hidden lg:flex space-x-6 text-sm">
                <a href="{% url 'about' %}" class="hover:text-blue-400 transition-colors">About</a>
                <a href="{% url 'actions' %}" class="hover:text-blue-400 transition-colors">Actions</a>
                <a href="{% url 'policies' %}" class="hover:text-blue-400 transition-colors">Policies</a>
            </nav>
        </div>
    </div>

    <!-- Secondary Navigation -->
    <div class="border-t border-gray-700">
        <div class="container mx-auto px-4 py-2">
            <div class="flex justify-between items-center">
                <div class="hover:skew-y-3 transition-transform">
                    <a href="{% url 'home' %}" class="text-sm hover:text-blue-400">
                        Auto Governing System | Australia
                    </a>
                </div>

                <div class="flex items-center space-x-4">
                    {% if user.is_authenticated %}
                        <a href="{% url 'notifications' %}"
                           class="hover:text-blue-400"
                           hx-get="{% url 'notifications_count' %}"
                           hx-trigger="load, every 30s"
                           hx-target="#notification-badge">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
                            </svg>
                            <span id="notification-badge"></span>
                        </a>
                    {% endif %}

                    <button @click="darkMode = !darkMode" class="hover:text-blue-400">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Main Navigation -->
    <div class="border-t border-gray-700">
        <div class="container mx-auto px-4 py-3">
            <div class="flex justify-between items-center">
                <!-- Mobile Menu Button -->
                <button @click="mobileMenuOpen = !mobileMenuOpen" class="lg:hidden">
                    <svg x-show="!mobileMenuOpen" class="w-6 h-6" fill="currentColor" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                    <svg x-show="mobileMenuOpen" class="w-6 h-6" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </button>

                <!-- Desktop Action Navigation -->
                <nav class="hidden lg:flex space-x-6">
                    <a href="{% url 'vote' %}" class="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors">Vote</a>
                    <a href="{% url 'contribute' %}" class="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors">Contribute</a>
                </nav>

                <!-- User Actions -->
                <div class="flex items-center space-x-4">
                    {% if not user.is_authenticated %}
                        <a href="{% url 'signin' %}" class="hover:text-blue-400">Login</a>
                    {% else %}
                        <a href="{% url 'profile' %}" class="hover:text-blue-400">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                            </svg>
                        </a>
                        <form method="post" action="{% url 'logout' %}" class="inline">
                            {% csrf_token %}
                            <button type="submit" class="hover:text-blue-400">Logout</button>
                        </form>
                    {% endif %}
                </div>
            </div>

            <!-- Mobile Menu -->
            <div x-show="mobileMenuOpen" x-collapse class="lg:hidden mt-4 border-t border-gray-700 pt-4">
                <div class="space-y-2">
                    <a href="{% url 'vote' %}" class="block px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded">Vote</a>
                    <a href="{% url 'contribute' %}" class="block px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded">Contribute</a>
                    <a href="{% url 'departments' %}" class="block px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded">Departments</a>
                </div>
            </div>
        </div>
    </div>
</header>

<script>
function headerData() {
    return {
        mobileMenuOpen: false,
        darkMode: localStorage.getItem('darkMode') === 'true',
        init() {
            this.$watch('darkMode', value => localStorage.setItem('darkMode', value))
        }
    }
}
</script>
```

### 3. Banner Component → banner.html

**Current React Component Features:**
- Dynamic quote fetching
- Conditional layout (with/without quote)
- Hover effects

**Django Template Conversion:**
```html
<!-- templates/components/banner.html -->
<div x-data="bannerData('{{ quote|default:'' }}', '{{ author|default:'' }}')"
     class="bg-gray-800 text-gray-300 p-20">

    <!-- Centered layout when no quote -->
    <div x-show="!hasQuote" class="flex flex-col items-center justify-center">
        <div class="transition-colors duration-300 hover:text-red-600">
            <h1 class="text-6xl font-bold text-center">{{ title }}</h1>
        </div>
        {% if subtitle %}
            <hr class="w-60 border-gray-400 my-6" />
            <p class="text-2xl text-center transition-all duration-300 hover:skew-y-1 hover:drop-shadow-lg">
                {{ subtitle }}
            </p>
        {% endif %}
    </div>

    <!-- Split layout with quote -->
    <div x-show="hasQuote" class="flex flex-col lg:flex-row">
        <div class="flex flex-col w-full lg:w-1/2 items-center mb-8 lg:mb-0">
            <div class="transition-colors duration-300 hover:text-red-600">
                <h1 class="text-4xl font-bold text-center">{{ title }}</h1>
            </div>
            {% if subtitle %}
                <hr class="w-40 border-gray-400 my-4" />
                <p class="text-lg text-center transition-all duration-300 hover:skew-y-1 hover:drop-shadow-lg">
                    {{ subtitle }}
                </p>
            {% endif %}
        </div>
        <div class="flex flex-col w-full lg:w-1/2">
            <div class="transition-all duration-300 hover:skew-y-1 hover:drop-shadow-lg">
                <h2 class="text-sm font-bold mb-2">&ldquo;<span x-text="currentQuote"></span>&rdquo;</h2>
            </div>
            <p x-show="currentAuthor" class="ml-8 text-sm">- <span x-text="currentAuthor"></span></p>
        </div>
    </div>
</div>

<script>
function bannerData(initialQuote, initialAuthor) {
    return {
        currentQuote: initialQuote,
        currentAuthor: initialAuthor,
        hasQuote: Boolean(initialQuote || initialAuthor),

        async init() {
            if (!this.currentQuote && !this.currentAuthor) {
                try {
                    const response = await fetch('https://api.quotable.io/random');
                    const data = await response.json();
                    this.currentQuote = data.content;
                    this.currentAuthor = data.author;
                    this.hasQuote = true;
                } catch (error) {
                    console.error('Failed to fetch quote:', error);
                }
            }
        }
    }
}
</script>
```

## Page Conversions

### 1. Departments Page

**Current Next.js Page Features:**
- Grid layout with responsive columns
- Card hover effects
- Modal popups
- Feedback form submission

**Django Template Conversion:**

**View (views.py):**
```python
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
import json

def departments_view(request):
    departments = [
        {
            'title': 'Defense',
            'subtitle': 'Defense, is superior to opulence.',
            'content': 'We all know that a strong country requires strong defense...',
            'image_url': 'assets/Departments_logos/defence.png',
        },
        # ... other departments
    ]
    return render(request, 'pages/departments.html', {'departments': departments})

@csrf_exempt
def submit_feedback(request):
    if request.method == 'POST':
        feedback = request.POST.get('feedback')
        page = request.POST.get('page')
        # Save feedback to database
        return JsonResponse({'success': True, 'message': 'Thank you for your feedback!'})
    return JsonResponse({'success': False, 'message': 'Invalid request'})
```

**Template (departments.html):**
```html
<!-- templates/pages/departments.html -->
{% extends 'base.html' %}
{% load static %}

{% block title %}Departments - AGVN{% endblock %}

{% block content %}
{% include 'components/banner.html' with title="Departments" subtitle="Learn about Australian Government Departments" %}

<div class="container mx-auto px-4 py-8" x-data="departmentsData()">
    <!-- Department Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {% for department in departments %}
            {% include 'components/cards/department_card.html' with department=department %}
        {% endfor %}
    </div>

    <hr class="my-12 border-gray-300" />

    <!-- Feedback Section -->
    <div class="max-w-2xl mx-auto">
        <h2 class="text-2xl font-bold text-center mb-6">
            Have feedback about our departments?
        </h2>

        <form hx-post="{% url 'submit_feedback' %}"
              hx-target="#feedback-result"
              hx-indicator="#feedback-loading"
              class="bg-white p-6 rounded-lg shadow-md">
            {% csrf_token %}
            <input type="hidden" name="page" value="departments">

            <div class="mb-4">
                <label for="feedback" class="block text-sm font-medium text-gray-700 mb-2">
                    Your Feedback
                </label>
                <textarea name="feedback"
                          x-model="feedbackText"
                          placeholder="Share your thoughts about our departments..."
                          rows="4"
                          class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required></textarea>
            </div>

            <button type="submit"
                    :disabled="!feedbackText.trim()"
                    class="w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
                <span id="feedback-loading" class="htmx-indicator">Submitting...</span>
                <span class="htmx-indicator">Submit Feedback</span>
            </button>
        </form>

        <div id="feedback-result" class="mt-4"></div>
    </div>
</div>

<script>
function departmentsData() {
    return {
        feedbackText: '',
        selectedDepartment: null,

        openModal(department) {
            this.selectedDepartment = department;
            this.$dispatch('open-modal', { department });
        }
    }
}
</script>
{% endblock %}
```

**Department Card Component:**
```html
<!-- templates/components/cards/department_card.html -->
<div @click="openModal({{ department|jsonify }})"
     class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 overflow-hidden group">

    <!-- Image -->
    <div class="relative h-48 overflow-hidden">
        <img src="{% static department.image_url %}"
             alt="{{ department.title }}"
             class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
        <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>

    <!-- Content -->
    <div class="p-6">
        <h3 class="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
            {{ department.title }}
        </h3>
        <p class="text-sm text-gray-600 mb-3 line-clamp-2">
            {{ department.subtitle }}
        </p>
        <div class="flex items-center text-blue-500 text-sm font-medium">
            Learn more
            <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
        </div>
    </div>
</div>
```

### 2. Vote Page with HTMX

**Current React Features:**
- Real-time voting
- Authentication checks
- Dynamic policy loading

**Django Template Conversion:**

**View:**
```python
@login_required
def vote_view(request):
    policies = Policy.objects.filter(is_active=True)
    return render(request, 'pages/vote.html', {'policies': policies})

@login_required
def submit_vote(request):
    if request.method == 'POST':
        policy_id = request.POST.get('policy_id')
        vote_type = request.POST.get('vote_type')

        # Process vote
        vote, created = Vote.objects.get_or_create(
            user=request.user,
            policy_id=policy_id,
            defaults={'vote_type': vote_type}
        )

        if not created:
            vote.vote_type = vote_type
            vote.save()

        # Return updated vote counts
        policy = Policy.objects.get(id=policy_id)
        return render(request, 'partials/vote_results.html', {'policy': policy})
```

**Template:**
```html
<!-- templates/pages/vote.html -->
{% extends 'base.html' %}

{% block content %}
{% include 'components/banner.html' with title="Vote on Policies" subtitle="Make your voice heard" %}

<div class="container mx-auto px-4 py-8" x-data="voteData()">
    <div class="grid gap-6">
        {% for policy in policies %}
            <div class="bg-white rounded-lg shadow-md p-6">
                <h3 class="text-xl font-bold mb-2">{{ policy.title }}</h3>
                <p class="text-gray-600 mb-4">{{ policy.description }}</p>

                <div class="flex space-x-4 mb-4">
                    <button hx-post="{% url 'submit_vote' %}"
                            hx-vals='{"policy_id": "{{ policy.id }}", "vote_type": "support"}'
                            hx-target="#vote-results-{{ policy.id }}"
                            hx-swap="outerHTML"
                            class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                        Support
                    </button>

                    <button hx-post="{% url 'submit_vote' %}"
                            hx-vals='{"policy_id": "{{ policy.id }}", "vote_type": "oppose"}'
                            hx-target="#vote-results-{{ policy.id }}"
                            hx-swap="outerHTML"
                            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                        Oppose
                    </button>
                </div>

                <div id="vote-results-{{ policy.id }}">
                    {% include 'partials/vote_results.html' with policy=policy %}
                </div>
            </div>
        {% endfor %}
    </div>
</div>

<script>
function voteData() {
    return {
        // Any client-side vote logic
    }
}
</script>
{% endblock %}
```

## State Management with Alpine.js

### Global State Store

```html
<!-- In base.html -->
<script>
document.addEventListener('alpine:init', () => {
    Alpine.store('app', {
        user: {{ user|jsonify|safe }},
        notifications: [],
        darkMode: localStorage.getItem('darkMode') === 'true',

        // Methods
        toggleDarkMode() {
            this.darkMode = !this.darkMode;
            localStorage.setItem('darkMode', this.darkMode);
        },

        addNotification(message, type = 'info') {
            const id = Date.now();
            this.notifications.push({ id, message, type });
            setTimeout(() => this.removeNotification(id), 5000);
        },

        removeNotification(id) {
            this.notifications = this.notifications.filter(n => n.id !== id);
        }
    });
});
</script>
```

### Component State Patterns

```html
<!-- Modal Component -->
<div x-data="{
    open: false,
    content: null,
    openModal(data) {
        this.content = data;
        this.open = true;
    },
    closeModal() {
        this.open = false;
        this.content = null;
    }
}"
@open-modal.window="openModal($event.detail)"
@keydown.escape.window="closeModal()">

    <div x-show="open"
         x-transition:enter="ease-out duration-300"
         x-transition:enter-start="opacity-0"
         x-transition:enter-end="opacity-100"
         x-transition:leave="ease-in duration-200"
         x-transition:leave-start="opacity-100"
         x-transition:leave-end="opacity-0"
         class="fixed inset-0 bg-black bg-opacity-50 z-50">

        <div @click.away="closeModal()"
             class="flex items-center justify-center min-h-screen p-4">
            <div x-show="open"
                 x-transition:enter="ease-out duration-300"
                 x-transition:enter-start="opacity-0 scale-95"
                 x-transition:enter-end="opacity-100 scale-100"
                 class="bg-white rounded-lg max-w-2xl w-full p-6">

                <div class="flex justify-between items-center mb-4">
                    <h2 x-text="content?.title" class="text-xl font-bold"></h2>
                    <button @click="closeModal()" class="text-gray-400 hover:text-gray-600">
                        &times;
                    </button>
                </div>

                <div x-html="content?.html"></div>
            </div>
        </div>
    </div>
</div>
```

## Dynamic Updates with HTMX

### Real-time Notifications

```html
<!-- Auto-updating notification count -->
<div hx-get="{% url 'notification_count' %}"
     hx-trigger="load, every 30s"
     hx-target="this"
     hx-swap="innerHTML">
    <span class="notification-badge">0</span>
</div>
```

### Form Submissions

```html
<!-- Inline form with validation -->
<form hx-post="{% url 'submit_form' %}"
      hx-target="#form-result"
      hx-indicator="#form-loading"
      hx-swap="innerHTML">

    <input type="text" name="field"
           hx-post="{% url 'validate_field' %}"
           hx-trigger="blur"
           hx-target="#field-error"
           class="form-input">
    <div id="field-error"></div>

    <button type="submit">
        <span id="form-loading" class="htmx-indicator">Loading...</span>
        <span class="htmx-indicator">Submit</span>
    </button>
</form>
<div id="form-result"></div>
```

### Infinite Scroll

```html
<!-- Auto-loading content -->
<div class="content-list">
    {% for item in items %}
        <div class="item">{{ item.title }}</div>
    {% endfor %}

    {% if has_more %}
        <div hx-get="{% url 'load_more' %}?page={{ next_page }}"
             hx-trigger="revealed"
             hx-target="this"
             hx-swap="outerHTML">
            <div class="loading-spinner">Loading more...</div>
        </div>
    {% endif %}
</div>
```

## Authentication & Session Management

### Django Views

```python
# views/auth.py
from django.contrib.auth import login, logout, authenticate
from django.shortcuts import render, redirect
from django.http import JsonResponse

def signin_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            if request.headers.get('HX-Request'):
                return JsonResponse({'success': True, 'redirect': '/'})
            return redirect('home')
        else:
            if request.headers.get('HX-Request'):
                return JsonResponse({'success': False, 'error': 'Invalid credentials'})

    return render(request, 'auth/signin.html')

def logout_view(request):
    logout(request)
    return redirect('home')
```

### Authentication Templates

```html
<!-- templates/auth/signin.html -->
<form hx-post="{% url 'signin' %}"
      hx-target="#auth-result"
      x-data="{ loading: false }"
      @htmx:beforeRequest="loading = true"
      @htmx:afterRequest="loading = false">

    {% csrf_token %}

    <div class="mb-4">
        <input type="text" name="username" placeholder="Username" required
               class="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500">
    </div>

    <div class="mb-4">
        <input type="password" name="password" placeholder="Password" required
               class="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500">
    </div>

    <button type="submit" :disabled="loading"
            class="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 disabled:opacity-50">
        <span x-show="!loading">Sign In</span>
        <span x-show="loading">Signing In...</span>
    </button>

    <div id="auth-result" class="mt-4"></div>
</form>
```

## Form Handling

### Django Forms Integration

```python
# forms.py
from django import forms

class FeedbackForm(forms.Form):
    feedback = forms.CharField(
        widget=forms.Textarea(attrs={
            'class': 'w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500',
            'rows': 4,
            'placeholder': 'Your feedback...'
        })
    )
    page = forms.CharField(widget=forms.HiddenInput())

class VoteForm(forms.Form):
    policy_id = forms.IntegerField(widget=forms.HiddenInput())
    vote_type = forms.ChoiceField(choices=[
        ('support', 'Support'),
        ('oppose', 'Oppose'),
        ('neutral', 'Neutral')
    ])
```

### Template Form Rendering

```html
<!-- Enhanced form with Alpine.js validation -->
<form x-data="formValidation()"
      @submit="validateForm($event)"
      hx-post="{% url 'submit_form' %}"
      hx-target="#form-result">

    {% csrf_token %}
    {{ form.as_p }}

    <button type="submit"
            :disabled="!isValid"
            :class="{'opacity-50 cursor-not-allowed': !isValid}"
            class="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
        Submit
    </button>
</form>

<script>
function formValidation() {
    return {
        isValid: false,
        errors: {},

        validateForm(event) {
            // Client-side validation logic
            this.isValid = this.checkFormValidity();
            if (!this.isValid) {
                event.preventDefault();
            }
        },

        checkFormValidity() {
            // Validation logic
            return true;
        }
    }
}
</script>
```

## Implementation Strategy

### Phase 1: Foundation Setup

1. **Django Template Structure**
   - Create base template with Alpine.js and HTMX
   - Set up component directory structure
   - Configure static files for Tailwind CSS

2. **Core Components**
   - Convert TheLayout to base.html
   - Convert TheHeader to header.html
   - Convert Banner component

3. **Basic Pages**
   - Home page conversion
   - About page conversion
   - Simple static pages

### Phase 2: Interactive Features

1. **Authentication System**
   - Convert auth pages
   - Implement session management
   - Add protected route handling

2. **Dynamic Components**
   - Vote page with HTMX
   - Departments page with modals
   - Form submissions

### Phase 3: Advanced Features

1. **Real-time Updates**
   - Notification system
   - Live vote results
   - WebSocket integration (optional)

2. **Data Visualization**
   - Chart.js integration
   - Budget visualization
   - Contribution tracking

### Phase 4: Polish & Optimization

1. **Performance**
   - Template caching
   - Static file optimization
   - Database query optimization

2. **User Experience**
   - Loading states
   - Error handling
   - Accessibility improvements

### Migration Checklist

- [ ] Set up Django template structure
- [ ] Install and configure Alpine.js, HTMX, Tailwind CSS
- [ ] Convert base layout and header
- [ ] Implement authentication templates
- [ ] Convert static pages (home, about)
- [ ] Convert interactive pages (vote, departments)
- [ ] Add form handling with HTMX
- [ ] Implement real-time features
- [ ] Add data visualization components
- [ ] Testing and optimization
- [ ] Deployment configuration

This migration strategy maintains the current functionality while leveraging Django's template system and modern web technologies for a more integrated and maintainable solution.
