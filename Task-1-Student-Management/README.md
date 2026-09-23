# CODSOFT_TASKS01

## Student Management System

A full-stack Student Management System developed as part of the **CodSoft Full Stack Web Development Internship**.

The application provides a simple dashboard for managing students, teachers, attendance, examinations, fees, and academic records.

## Features

- Student Management
  - Add students
  - Edit student details
  - Delete students
  - Gmail email validation

- Teacher Management
  - Add teachers
  - Edit teacher details
  - Delete teachers
  - Gmail email validation

- Attendance Management
  - View student attendance
  - Mark students as Present or Absent
  - Automatic attendance percentage

- Examination Management
  - Add examinations
  - Update examination status
  - Delete examinations

- Fees Management
  - View student fee details
  - Update paid fees
  - Track pending fees

- Academic Records
  - View student academic records
  - Update marks
  - Automatic grade calculation

- Dashboard
  - Total students
  - Total teachers
  - Attendance percentage
  - Pending fees
  - Recent activity

## Technologies Used

### Frontend
- React.js
- HTML
- CSS
- JavaScript
- Vite

### Backend
- Node.js
- Express.js
- CORS

### Data Storage
- JSON files

## Project Structure

```text
CODSOFT_TASKS01
│
├── backend
│   ├── academicRecords.json
│   ├── attendance.json
│   ├── examinations.json
│   ├── fees.json
│   ├── students.json
│   ├── teachers.json
│   ├── package.json
│   └── server.js
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── .gitignore
└── README.md