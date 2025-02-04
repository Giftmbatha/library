-- Active: 1725052241840@@127.0.0.1@3306@library_management_system
-- Create the database
CREATE DATABASE IF NOT EXISTS library_management_system;
USE library_management_system;

-- Create Books table
CREATE TABLE Books (
    BookID INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Author VARCHAR(255) NOT NULL,
    ISBN VARCHAR(13) UNIQUE NOT NULL
);

-- Create Members table
CREATE TABLE Members (
    MemberID INT AUTO_INCREMENT PRIMARY KEY,
    MemberName VARCHAR(255) NOT NULL,
    MemberAddress TEXT NOT NULL
);

-- Create Loans table
CREATE TABLE Loans (
    LoanID INT AUTO_INCREMENT PRIMARY KEY,
    BookID INT,
    MemberID INT,
    CheckoutDate DATE NOT NULL,
    ReturnDate DATE,
    FOREIGN KEY (BookID) REFERENCES Books(BookID),
    FOREIGN KEY (MemberID) REFERENCES Members(MemberID)
);


DELETE FROM Members;

INSERT INTO Members (MemberName, MemberAddress) VALUES 
('Sipho Dlamini', '123 Soweto St, Johannesburg'),
('Thandiwe Mbatha', '45 Beach Rd, Durban'),
('Kagiso Molefe', '12 Freedom Ave, Pretoria'),
('Naledi Mokoena', '78 Ocean Dr, Cape Town'),
('Lerato Mkhize', '34 Mandela Ave, Bloemfontein'),
('Vusi Khumalo', '56 Braamfontein St, Johannesburg'),
('Ayanda Zulu', '98 Sun City Rd, Rustenburg'),
('Palesa Ntuli', '11 Peace St, Pietermaritzburg'),
('Lindiwe Nkosi', '67 Royal Rd, Kimberley'),
('Tshepo Maseko', '23 Zulu St, Polokwane'),
('Nomsa Ndlovu', '33 Garden Ln, Port Elizabeth'),
('Bongani Sithole', '90 Protea St, East London'),
('Dineo Mthembu', '14 Cedar Rd, George'),
('Zanele Shabalala', '66 Table Mountain Rd, Cape Town'),
('Mandla Nkosi', '5 Rainbow Blvd, Durban');

-- Deleting existing data in Books table
DELETE FROM Books;

-- Inserting sample book data
INSERT INTO Books (Title, Author, ISBN) VALUES
('Cry, the Beloved Country', 'Alan Paton', '9780743262170'),
('Long Walk to Freedom', 'Nelson Mandela', '9780316548182'),
('Born a Crime', 'Trevor Noah', '9780399588198'),
('Disgrace', 'J.M. Coetzee', '9780140296402'),
('Ways of Dying', 'Zakes Mda', '9780195717212'),
('July\'s People', 'Nadine Gordimer', '9780140061406'),
('The Power of One', 'Bryce Courtenay', '9780143004554'),
('The Book of the Dead', 'Kgebetli Moele', '9781770098419'),
('The Seed is Mine', 'Charles van Onselen', '9780806136397'),
('The Last Poets', 'Christine Otten', '9781910453298');

-- Deleting existing data in Loans table
DELETE FROM Loans;

-- Inserting sample loan data
INSERT INTO Loans (BookID, MemberID, CheckoutDate, ReturnDate) VALUES
(1, 1, '2024-09-10', '2024-10-10'),
(2, 3, '2024-09-15', NULL),  -- currently checked out
(3, 2, '2024-08-01', '2024-08-30'),
(4, 5, '2024-09-05', '2024-09-25'),
(5, 4, '2024-08-12', NULL),  -- currently checked out
(6, 7, '2024-09-01', '2024-09-15'),
(7, 8, '2024-09-20', NULL),  -- currently checked out
(8, 9, '2024-07-22', '2024-08-15'),
(9, 10, '2024-06-30', '2024-07-25'),
(10, 12, '2024-09-29', NULL);  -- currently checked out
