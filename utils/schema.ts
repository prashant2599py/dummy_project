import { pgTable, serial, varchar, date, integer, boolean } from 'drizzle-orm/pg-core';

// Define the `batch` table
export const batch = pgTable('batch', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull().unique(), // Unique name for each batch
  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),
  createdAt: date('created_at').defaultNow(),
});

// Define the `students` table with a reference to `batch`
export const students = pgTable('students', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  batchId: integer('batch_id').references(() => batch.id), // Foreign key to the `batch` table
  createdAt: date('created_at').defaultNow(),
  createdBy: integer('created_by').notNull(), 
});


// Define the `attendance` table
export const attendance = pgTable('attendance', {
  id: serial('id').primaryKey(),
  studentId: integer('student_id').notNull(), // Foreign key to the `students` table
  date: date('date').notNull(),
  isPresent: boolean('is_present').default(false),
  createdAt: date('created_at').defaultNow(),
});
