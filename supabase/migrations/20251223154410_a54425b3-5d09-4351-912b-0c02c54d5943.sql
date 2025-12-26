-- Create categories enum
CREATE TYPE public.product_category AS ENUM ('glasses', 'shoes', 'hats', 'accessories');

-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category product_category NOT NULL,
  image_url TEXT,
  ar_enabled BOOLEAN DEFAULT false,
  rating DECIMAL(2,1) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Products are publicly viewable
CREATE POLICY "Products are viewable by everyone" 
ON public.products 
FOR SELECT 
USING (true);

-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (new.id, new.raw_user_meta_data ->> 'full_name');
  RETURN new;
END;
$$;

-- Trigger for auto-creating profiles
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add triggers for updated_at
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample products
INSERT INTO public.products (name, description, price, category, image_url, ar_enabled, rating) VALUES
-- Glasses
('Classic Aviator', 'Timeless aviator sunglasses with gold frame', 149.99, 'glasses', '/hero-glasses.jpg', true, 4.8),
('Modern Wayfarer', 'Contemporary wayfarer with polarized lenses', 129.99, 'glasses', '/hero-glasses.jpg', true, 4.6),
('Sport Shield', 'Performance sports sunglasses', 189.99, 'glasses', '/hero-glasses.jpg', true, 4.7),
('Vintage Round', 'Retro-inspired round frames', 99.99, 'glasses', '/hero-glasses.jpg', true, 4.5),
('Cat Eye Elegance', 'Sophisticated cat-eye design', 159.99, 'glasses', '/hero-glasses.jpg', true, 4.9),
-- Shoes
('Urban Runner Pro', 'Premium running shoes for city streets', 179.99, 'shoes', '/placeholder.svg', true, 4.7),
('Classic Leather Oxford', 'Handcrafted leather dress shoes', 249.99, 'shoes', '/placeholder.svg', true, 4.8),
('Street Style Sneaker', 'Trendy casual sneakers', 129.99, 'shoes', '/placeholder.svg', true, 4.6),
('Athletic Training X', 'Cross-training performance shoes', 159.99, 'shoes', '/placeholder.svg', true, 4.5),
-- Hats
('Fedora Classic', 'Elegant wool fedora hat', 79.99, 'hats', '/placeholder.svg', true, 4.6),
('Baseball Cap Pro', 'Adjustable cotton baseball cap', 34.99, 'hats', '/placeholder.svg', true, 4.4),
('Winter Beanie', 'Cozy knit beanie for cold days', 29.99, 'hats', '/placeholder.svg', true, 4.7),
('Straw Sun Hat', 'Wide-brim straw hat for summer', 49.99, 'hats', '/placeholder.svg', true, 4.5);
