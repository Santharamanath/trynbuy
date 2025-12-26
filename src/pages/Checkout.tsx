import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  CreditCard, 
  Smartphone, 
  Building2, 
  CheckCircle2,
  Lock,
  ShoppingBag 
} from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const totalPrice = getTotalPrice();

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setOrderPlaced(true);
    
    toast({
      title: "Order Placed Successfully!",
      description: "Thank you for your purchase. You'll receive a confirmation email shortly.",
    });

    // Clear cart after successful order
    setTimeout(() => {
      clearCart();
      navigate("/");
    }, 3000);
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full gradient-card border-2 border-dashed border-primary/30 flex items-center justify-center mb-6 mx-auto">
            <ShoppingBag className="h-10 w-10 text-primary/50" />
          </div>
          <h2 className="font-display text-2xl font-bold mb-3">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Add some items to your cart to proceed with checkout.</p>
          <Button variant="hero" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center px-4">
        <div className="text-center animate-fade-in">
          <div className="w-24 h-24 rounded-full gradient-accent flex items-center justify-center mb-6 mx-auto animate-pulse-glow">
            <CheckCircle2 className="h-12 w-12 text-primary-foreground" />
          </div>
          <h2 className="font-display text-3xl font-bold mb-3">Order Confirmed!</h2>
          <p className="text-muted-foreground mb-2">Thank you for shopping with TryNBuy</p>
          <p className="text-sm text-muted-foreground">Redirecting to homepage...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-hero">
      {/* Header */}
      <div className="glass border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-display text-xl font-bold">Checkout</h1>
              <p className="text-sm text-muted-foreground">Complete your purchase</p>
            </div>
            <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="h-4 w-4 text-primary" />
              Secure Checkout
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Payment Methods */}
          <div className="lg:col-span-3 space-y-6">
            {/* Contact Info */}
            <div className="gradient-card rounded-2xl border border-border/50 p-6">
              <h2 className="font-display text-lg font-semibold mb-4">Contact Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" placeholder="+91 98765 43210" />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="gradient-card rounded-2xl border border-border/50 p-6">
              <h2 className="font-display text-lg font-semibold mb-4">Shipping Address</h2>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main Street" />
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Mumbai" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" placeholder="Maharashtra" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input id="pincode" placeholder="400001" />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="gradient-card rounded-2xl border border-border/50 p-6">
              <h2 className="font-display text-lg font-semibold mb-4">Payment Method</h2>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                {/* UPI */}
                <label 
                  htmlFor="upi" 
                  className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === "upi" 
                      ? "border-primary bg-primary/5" 
                      : "border-border/50 hover:border-border"
                  }`}
                >
                  <RadioGroupItem value="upi" id="upi" />
                  <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center shrink-0">
                    <Smartphone className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">UPI</p>
                    <p className="text-sm text-muted-foreground">Pay using Google Pay, PhonePe, Paytm, or any UPI app</p>
                  </div>
                </label>

                {/* Debit Card */}
                <label 
                  htmlFor="debit" 
                  className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === "debit" 
                      ? "border-primary bg-primary/5" 
                      : "border-border/50 hover:border-border"
                  }`}
                >
                  <RadioGroupItem value="debit" id="debit" />
                  <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center shrink-0">
                    <CreditCard className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Debit Card</p>
                    <p className="text-sm text-muted-foreground">Visa, Mastercard, Rupay and more</p>
                  </div>
                </label>

                {/* Credit Card */}
                <label 
                  htmlFor="credit" 
                  className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === "credit" 
                      ? "border-primary bg-primary/5" 
                      : "border-border/50 hover:border-border"
                  }`}
                >
                  <RadioGroupItem value="credit" id="credit" />
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                    <CreditCard className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Credit Card</p>
                    <p className="text-sm text-muted-foreground">Visa, Mastercard, American Express</p>
                  </div>
                </label>

                {/* Net Banking */}
                <label 
                  htmlFor="netbanking" 
                  className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === "netbanking" 
                      ? "border-primary bg-primary/5" 
                      : "border-border/50 hover:border-border"
                  }`}
                >
                  <RadioGroupItem value="netbanking" id="netbanking" />
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                    <Building2 className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Net Banking</p>
                    <p className="text-sm text-muted-foreground">All major banks supported</p>
                  </div>
                </label>
              </RadioGroup>

              {/* Card Details (shown for card payments) */}
              {(paymentMethod === "debit" || paymentMethod === "credit") && (
                <div className="mt-6 pt-6 border-t border-border/50 space-y-4 animate-fade-in">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" type="password" placeholder="***" maxLength={4} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input id="cardName" placeholder="JOHN DOE" />
                  </div>
                </div>
              )}

              {/* UPI ID (shown for UPI) */}
              {paymentMethod === "upi" && (
                <div className="mt-6 pt-6 border-t border-border/50 animate-fade-in">
                  <div className="space-y-2">
                    <Label htmlFor="upiId">UPI ID</Label>
                    <Input id="upiId" placeholder="yourname@upi" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="gradient-card rounded-2xl border border-border/50 p-6 sticky top-24">
              <h2 className="font-display text-lg font-semibold mb-4">Order Summary</h2>
              
              {/* Items */}
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
                      <img
                        src={item.product.image_url || "/placeholder.svg"}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold text-primary">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-border/50 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-primary">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${(totalPrice * 0.18).toFixed(2)}</span>
                </div>
                <div className="h-px bg-border my-3" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-gradient">${(totalPrice * 1.18).toFixed(2)}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <Button
                variant="hero"
                size="lg"
                className="w-full mt-6"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    Place Order
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                By placing this order, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
