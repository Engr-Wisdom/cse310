# Hospital Management System

## Overview

As a software engineer, I am continually improving my software development skills by learning and applying C# programming, object-oriented programming, file handling, and software development principles.

Hospital Management System is a C# console-based application designed to help manage basic hospital records, including patients, doctors, and appointments. The system allows users to register patients and doctors, schedule appointments, view stored records, and delete records when necessary.

The purpose of creating this software was to strengthen my understanding of C# programming, object-oriented programming, classes and objects, methods, collections, conditional statements, loops, input validation, and file handling.

The application also demonstrates persistent data storage by saving patient, doctor, and appointment information to text files. This allows the data to remain available even after the application is closed and restarted.

**Software Demo Video**

[Software Demo Video](Add Your Video Link Here)

---

## Development Environment

### Tools Used

* Visual Studio Code
* .NET SDK
* C# Compiler
* Git
* GitHub
* Terminal / Command Prompt

### Technologies Used

* .NET
* C#
* File I/O
* Object-Oriented Programming
* Collections
* LINQ

### Programming Language

* C#

---

## Features

* Register new patients.
* Automatically generate patient IDs.
* View all registered patients.
* Delete patient records.
* Register new doctors.
* Automatically generate doctor IDs.
* View all registered doctors.
* Delete doctor records.
* Book hospital appointments.
* Automatically generate appointment IDs.
* Validate that the selected patient exists before booking an appointment.
* Validate that the selected doctor exists before booking an appointment.
* View all appointments.
* Delete appointment records.
* Save patient information to a text file.
* Save doctor information to a text file.
* Save appointment information to a text file.
* Load saved information when the application starts.
* Human-readable text file formatting.
* Console-based interactive menu.
* Input validation for important user inputs.

---

## Data Storage

The application uses text files for persistent data storage.

The `Data` folder contains three files:

```text
Data
│
├── patients.txt
├── doctors.txt
└── appointments.txt
```

### patients.txt

Patient information is stored in a readable format:

```text
Patient ID: 1
Name: Effiong
Age: 31
Gender: Male
Phone Number: 42323112
Address: 32 Ambo
----------------------------------------
```

### doctors.txt

Doctor information is stored in the following format:

```text
Doctor ID: 1
Name: Dr. Smith
Specialty: Cardiology
Phone Number: 08012345678
----------------------------------------
```

### appointments.txt

Appointment information is stored in the following format:

```text
Appointment ID: 1
Patient ID: 1
Doctor ID: 1
Appointment Date: 2026-08-15
Reason: General Checkup
----------------------------------------
```

The service classes are responsible for both writing information to these files and loading the information when the application starts.

---

## Project Structure

```text
HospitalManagementSystem
│
├── Data
│   ├── patients.txt
│   ├── doctors.txt
│   └── appointments.txt
│
├── Models
│   ├── Patient.cs
│   ├── Doctor.cs
│   └── Appointment.cs
│
├── Services
│   ├── PatientService.cs
│   ├── DoctorService.cs
│   └── AppointmentService.cs
│
├── Program.cs
├── HospitalManagementSystem.csproj
└── README.md
```

---

## Architecture

The application separates its responsibilities into different parts.

### Program.cs

`Program.cs` is the main entry point of the application. It provides the interactive menu and collects information from the user.

It communicates with the service classes to perform operations such as adding patients, registering doctors, and booking appointments.

### Models

The `Models` folder defines the structure of the application's data.

The `Patient` class represents patient information.

The `Doctor` class represents doctor information.

The `Appointment` class represents appointment information.

### Services

The `Services` folder contains the business logic of the application.

`PatientService` manages patient records.

`DoctorService` manages doctor records.

`AppointmentService` manages appointment records.

The services are also responsible for generating IDs and saving and loading information from the text files.

### Data

The `Data` folder provides persistent storage for the application.

The services write information to the text files and load that information when the application starts.

The relationship between these components can be summarized as:

```text
Program.cs
    │
    ▼
Services
    │
    ▼
Models
    │
    ▼
Data Files
```

The Models define what the data looks like, the Services manage the data, the Data folder stores the information permanently, and `Program.cs` allows the user to interact with the system.

---

## Running the Project

Clone the repository.

```bash
git clone https://github.com/Engr-Wisdom/cse310.git
```

Navigate to the project folder.

```bash
cd HospitalManagementSystem
```

Build the project.

```bash
dotnet build
```

Run the application.

```bash
dotnet run
```

The application will display the Hospital Management System menu in the terminal.

---

## Example Menu

```text
=======================================
      HOSPITAL MANAGEMENT SYSTEM
=======================================
1. Add Patient
2. View Patients
3. Add Doctor
4. View Doctors
5. Book Appointment
6. View Appointments
7. Delete Patient
8. Delete Doctor
9. Delete Appointment
10. Exit
=======================================
```

---

## C# Concepts Demonstrated

This project demonstrates several fundamental C# programming concepts, including:

* Variables
* Expressions
* Conditional statements
* Loops
* Methods and functions
* Classes and objects
* Constructors
* Properties
* Lists and collections
* LINQ
* Input validation
* File reading and writing
* Object-oriented programming
* Separation of responsibilities
* Persistent data storage

---

## Useful Websites

* C# Documentation – https://learn.microsoft.com/dotnet/csharp/
* .NET Documentation – https://learn.microsoft.com/dotnet/
* .NET CLI Documentation – https://learn.microsoft.com/dotnet/core/tools/
* C# File I/O Documentation – https://learn.microsoft.com/dotnet/standard/io/
* C# Classes Documentation – https://learn.microsoft.com/dotnet/csharp/fundamentals/types/classes
* LINQ Documentation – https://learn.microsoft.com/dotnet/csharp/linq/
* Git Documentation – https://git-scm.com/doc
* GitHub Documentation – https://docs.github.com/