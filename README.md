# APP

GymPass app style.

# FR (Functional Requirements)

- [x] Users should be able to register.
- [x] Users should be able to authenticate.
- [x] Users should be able to view their profile.
- [x] Users should be able to view their total number of check-ins.
- [x] Users should be able to view their check-in history.
- [x] Users should be able to find the nearest gyms.
- [x] Users should be able to search for gyms by name.
- [x] Users should be able to check-in at a gym.
- [x] Check-ins should be able to be validated.
- [x] Admins should be able to register new gyms.

# BR (Business Rules)

- [x] Duplicate email addresses should not be allowed during registration.
- [x] Users should not be able to check-in more than once a day.
- [x] Users should not be able to check-in if they are more than 100 meters away from the gym.
- [x] Check-ins should only be validated within 20 minutes of the check-in time.
- [ ] Only admins should be able to validate check-ins.
- [ ] Only admins should be able to register new gyms.

# NFR (Non-Functional Requirements)

- [x] User passwords should be encrypted in the database.
- [x] Data should be persisted in a PostgreSQL database.
- [x] All data lists should be paginated with 20 items per page.
- [ ] Users should be identified in the system using JWT (JSON Web Token).
