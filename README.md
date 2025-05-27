https://ironhack-secondproject.netlify.app/

[![Netlify Status](https://api.netlify.com/api/v1/badges/aa093efe-24cf-4edd-be79-7a3db5ea6ee4/deploy-status)](https://app.netlify.com/projects/ironhack-secondproject/deploys) [![Maintainability](https://qlty.sh/badges/23070675-7f71-4d12-82c1-ebcd3438955e/maintainability.svg)](https://qlty.sh/gh/VladimirMastepanov/projects/IronHack-Todo)

# IronHack Todo

**IronHack Todo** is a seemingly simple todo application built with **Vue 3** and **TypeScript**, but it’s packed with features and carefully designed with maintainability, accessibility, and user experience in mind.

## Features

- ✅ **User Authentication** (via [Supabase](https://supabase.com)):
  - Secure access to personal tasks only.
  - Registration includes optional avatar upload.
- 📦 **State Management** with [Pinia](https://pinia.vuejs.org/), using persistent storage.
- 🌍 **Internationalization** with [vue-i18n](https://vue-i18n.intlify.dev/):
  - English 🇬🇧 and Spanish 🇪🇸 out of the box.
  - Easily extendable to more languages.
- 🌓 **Light/Dark Theme** support:
  - Respects system preference by default.
  - Saves user selection.
- 🧭 **Routing** with Vue Router:
  - Protected routes for authenticated users.
- 🗂️ **Task Management**:
  - Create, edit, delete (with confirmation).
  - Mark as complete.
  - Filter by text or partial match.
  - Sort by priority, completion status, or alphabetically.
- 🎨 **Material Design-inspired UI**:
  - Custom design tokens.
  - Reusable UI components (buttons, inputs, textareas).
  - Ripple effect for buttons.
- ⚙️ **Custom Directives**:
  - Lightweight solutions replacing external packages.

## Tech Stack

- **Frontend**: Vue 3, TypeScript, Vite
- **State Management**: Pinia
- **Backend**: Supabase
- **Internationalization**: vue-i18n
- **Routing**: Vue Router
- **Styling**: Custom CSS with design tokens

## Screenshots
