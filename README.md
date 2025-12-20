# CityFix  
Public Infrastructure Issue Reporting System

CityFix is a full-stack web application that allows citizens to report public infrastructure issues and enables government authorities to efficiently manage, assign, track, and resolve those issues through a transparent and role-based system.

---

## Live Website
https://project-city-fix.netlify.app/


## GitHub Repositories
- Client Repository: https://github.com/rafiultalukdar1/CityFix-Client.git
- Server Repository: https://github.com/rafiultalukdar1/CityFix-Server.git

---

## Demo Access Information

For evaluation purposes, role-based demo access (Admin, Staff, and Citizen)
is provided separately according to the submission instructions.

The provided demo accounts are pre-configured with real data so that reviewers can:
- Access dashboards based on different user roles
- Verify issue assignment and workflow
- Review staff activities and issue progress
- Test premium features and payment flows

No additional account setup is required to evaluate the application.

---

## Project Overview

Municipal infrastructure issues such as broken roads, garbage overflow, water leakage, and damaged footpaths often suffer from delayed responses and lack of transparency.  
CityFix solves this problem by providing a centralized digital platform where:

- Citizens can report issues
- Admins can verify and assign issues
- Staff can resolve issues
- Everyone can track progress in real time

---

## How the System Works

1. Citizens submit issues with title, description, image, category, and location.
2. Admin reviews the issue and assigns it to a staff member.
3. Assigned staff verifies the issue and updates progress.
4. Issue status moves through the following stages:  
   Pending → In-Progress → Working → Resolved → Closed
5. Every important action creates a timeline record.
6. Citizens can track updates at any time.
7. Premium citizens receive priority services.

---

## Main Features (Requirement Based)

- Citizens can report public infrastructure issues.
- Role-based system with Admin, Staff, and Citizen roles.
- Secure authentication using Email/Password and Google Sign-In.
- Fully responsive design for mobile, tablet, and desktop.
- Private routes remain logged in after page refresh.
- Issue upvote system with one upvote per user.
- Users cannot upvote their own issues.
- Issue priority boost through payment (100 TK per issue).
- Premium subscription system (1000 TK).
- Real-time UI updates using TanStack Query.
- Toast and alert notifications for all CRUD actions.
- No Lorem Ipsum text used anywhere.
- Firebase and MongoDB secrets secured using environment variables.

---

## Home Page

- Navbar with logo and navigation links.
- User profile dropdown after login.
- Attractive banner or slider section.
- Latest resolved issues section (minimum six issues).
- Features section.
- How It Works section.
- Additional sections for better user experience.
- Fully functional footer.
- Custom 404 Not Found page.

---

## All Issues Page

- Displays all reported issues in card format.
- Each issue shows image, title, category, status badge, priority badge, location, and upvote count.
- View Details button navigates to the issue details page.
- Server-side pagination implemented.
- Server-side search and filtering by category, status, and priority.
- Upvote rules:
  - Login required
  - One upvote per user
  - Users cannot upvote their own issues
  - Boosted issues always appear above normal issues

---

## Issue Details Page (Private Route)

- Displays complete information about an issue.
- Edit and delete options for issue owner if status is pending.
- Boost issue priority button with payment integration.
- Assigned staff information shown when available.
- Issue timeline displaying:
  - Issue creation
  - Staff assignment
  - Status changes
  - Boost payment
  - Issue closure

---

## Citizen Dashboard

### Dashboard Overview
- Total submitted issues
- Total pending issues
- Total in-progress issues
- Total resolved issues
- Total payments
- Statistics displayed using cards and charts

### My Issues
- View all issues submitted by the logged-in user
- Filter by status and category
- Edit pending issues using a pre-filled modal
- Delete issues
- Navigate to issue details page

### Report Issue
- Issue submission form with title, description, category, image upload, and location
- Free users can submit a maximum of three issues
- Premium users can submit unlimited issues
- Timeline entry automatically added after submission

### Profile
- View and update user profile information
- Premium subscription option
- Premium badge display after subscription
- Blocked user warning message if blocked by admin

---

## Staff Dashboard

- Staff can view only the issues assigned to them.
- Dashboard statistics and charts.
- Assigned issues displayed in tabular format.
- Issue status workflow:
  - Pending → In-Progress
  - In-Progress → Working
  - Working → Resolved
  - Resolved → Closed
- Timeline entry created for every status change.
- Profile update functionality.

---

## Admin Dashboard

- Dashboard analytics with cards and charts.
- View all issues with boosted issues appearing first.
- Assign staff to issues (one-time assignment only).
- Reject issues when status is pending.
- Manage citizen users with block and unblock functionality.
- Manage staff accounts (add, update, delete).
- View all payments.
- Downloadable invoice PDF.
- View latest issues, users, and payment records.

---

## Payment System

- Stripe payment gateway integration.
- Issue boost payment (100 TK per issue).
- Premium subscription payment (1000 TK).
- Payment history available for admin and users.
- Invoice PDF download feature.

---

## Security and Middleware

- Firebase Authentication.
- JWT-based token verification.
- Role-based route and API protection.
- Axios interceptors.
- Environment variable protection for sensitive data.
- Persistent private routes after page refresh.

---

## Technology Stack

### Client Side
- React
- React Router
- Tailwind CSS / DaisyUI
- TanStack Query
- Axios
- Firebase Authentication
- Stripe
- React PDF

### Server Side
- Node.js
- Express.js
- MongoDB
- Firebase Admin SDK
- JWT
- Stripe API
