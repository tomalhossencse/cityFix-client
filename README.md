## 🚧 Public Infrastructure Issue Reporting System (PIRS)

### 🌟 Project Overview

The Public Infrastructure Issue Reporting System (PIRS) is a robust, full-stack digital platform designed to streamline communication between citizens and municipal services. It provides a transparent, centralized, and efficient solution for reporting public infrastructure problems—such as broken streetlights, potholes, and garbage overflow—and enabling government staff to manage, track, and resolve these issues effectively.

This system aims to improve city service delivery by enhancing transparency, reducing response times, and facilitating infrastructure data analysis.

---

### 🔑 Key Access & Deployment Information

| Field              | Value                                                       |
| :----------------- | :---------------------------------------------------------- |
| **Website Name**   | CityFix Public Infrastructure Issue Reporting System (PIRS) |
| **Admin Email**    | `rahim@gmail.com` (Use this for initial Admin login)        |
| **Admin Password** | `#Rahim123`                                                 |
| **Live Site URL**  | `[https://cityfixbd.netlify.app]`                           |

---

### ✨ Core Website Features

The system is built with a three-tier role management system (Citizen, Staff, Admin) and offers the following critical features:

1.  **Centralized Issue Reporting:** Citizens submit detailed reports complete with a title, description, category, **image upload**, and specific **location** data.
2.  **Comprehensive Issue Tracking Timeline:** Every issue features a robust, read-only vertical timeline that documents its complete lifecycle, recording every status change, assignment, and update for **full audit history**.
3.  **Role-Based Management System:** Secure, private dashboards tailored for **Citizen**, **Staff**, and **Admin** roles, enforced by token-based role verification middleware.
4.  **Issue Prioritization & Boosting:** Citizens can pay to **boost an issue's priority to 'High'**, ensuring it is prioritized and appears above normal reports.
5.  **Staff Assignment & Workflow:** Administrators assign pending issues to specific staff members, who then manage the issue through a defined status flow (_Pending → In-Progress → Working → Resolved → Closed_).
6.  **Subscription & Limits:** Free users are limited to 3 reports; subscribing to a premium plan grants **unlimited issue reporting** capabilities and priority support.
7.  **Upvoting Mechanism:** Logged-in citizens can upvote issues to signal public importance, with controls in place to prevent self-upvoting and duplicate votes.
8.  **Full Admin Control:** Admins can **add/manage staff accounts**, manage staff details, and **block/unblock citizen users** to maintain system integrity.
9.  **Advanced Data Filtering & Search:** Implements **server-side search, filtering** (by status, category, location, priority), and **pagination** on the main **All Issues** page.
10. **Payment History and Invoicing:** The system tracks all payments (Boosts and Subscriptions), and users/admins can download **PDF invoices** for their transactions.

---

### 💻 Technical Stack & Requirements

| Category        | Technology / Requirement | Compliance Notes                                              |
| :-------------- | :----------------------- | :------------------------------------------------------------ |
| **Frontend**    | React, HTML5, CSS3       | **Fully Responsive** design guaranteed.                       |
| **State Mgmt**  | **TanStack Query**       | Used for **all** data fetching, caching, and synchronization. |
| **Backend**     | Node.js / Express.js     | Secure API endpoints with **Token & Role-Based Middleware**.  |
| **Database**    | MongoDB                  | Stores all application data securely.                         |
| **Security**    | Environment Variables    | Firebase and MongoDB secrets are hidden in `.env` files.      |
| **UX/UI**       | Sweet Alert / Toast      | Used for all login, signup, and CRUD action notifications.    |
| **Persistence** | Private Routes           | User status remains **logged in** after page refresh.         |

---

### 🛠️ Local Setup Guide

Follow these steps to set up and run the project locally.

#### 1. Clone Client the Repository

```bash
git clone [https://github.com/tomalhossencse/cityFix-client]
cd cityFix-client
```

#### 2. Clone Server the Repository

```bash
git clone [https://github.com/tomalhossencse/cityFix-server]
cd cityFix-servre
```
