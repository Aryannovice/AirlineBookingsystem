/*
  # Initial Schema Setup for Albatross Airlines

  1. New Tables
    - `flights`
      - `id` (uuid, primary key)
      - `flight_number` (text)
      - `departure` (text)
      - `arrival` (text)
      - `departure_time` (timestamptz)
      - `arrival_time` (timestamptz)
      - `price` (decimal)
      - `seats_available` (integer)
      - `created_at` (timestamptz)

    - `bookings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `flight_id` (uuid, references flights)
      - `passenger_name` (text)
      - `passenger_email` (text)
      - `booking_date` (timestamptz)
      - `status` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create flights table
CREATE TABLE flights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  flight_number text NOT NULL,
  departure text NOT NULL,
  arrival text NOT NULL,
  departure_time timestamptz NOT NULL,
  arrival_time timestamptz NOT NULL,
  price decimal(10,2) NOT NULL,
  seats_available integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  flight_id uuid REFERENCES flights NOT NULL,
  passenger_name text NOT NULL,
  passenger_email text NOT NULL,
  booking_date timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'confirmed',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE flights ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Flights policies
CREATE POLICY "Flights are viewable by everyone"
  ON flights FOR SELECT
  TO public
  USING (true);

-- Bookings policies
CREATE POLICY "Users can view their own bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings"
  ON bookings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);