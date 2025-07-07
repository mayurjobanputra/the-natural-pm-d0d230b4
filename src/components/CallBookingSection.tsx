import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, CheckCircle, Phone, Video } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  timeSlot: z.string().min(1, "Please select a time slot"),
  callType: z.string().min(1, "Please select call type"),
  additionalInfo: z.string().optional()
});

type FormData = z.infer<typeof formSchema>;

const timeSlots = [
  "Tomorrow 10:00 AM EST",
  "Tomorrow 2:00 PM EST",
  "Tomorrow 4:00 PM EST",
  "Day After Tomorrow 10:00 AM EST",
  "Day After Tomorrow 2:00 PM EST",
  "Day After Tomorrow 4:00 PM EST",
  "This Friday 10:00 AM EST",
  "This Friday 2:00 PM EST",
  "This Friday 4:00 PM EST"
];

const benefits = [
  "Personalized PM career roadmap",
  "Identify your unique value proposition",
  "Overcome your specific challenges",
  "Learn about program options",
  "Get answers to all your questions",
  "No pressure, just valuable insights"
];

export function CallBookingSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      timeSlot: "",
      callType: "",
      additionalInfo: ""
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Call booking data:", data);
      toast.success("Your strategy call has been booked successfully!");
      setIsBooked(true);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isBooked) {
    return (
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                You're All Set! 🎉
              </h2>
              <p className="text-xl text-muted-foreground mb-6">
                Your strategy call has been booked successfully. You'll receive a confirmation
                email with the meeting details shortly.
              </p>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4">What to Expect:</h3>
                <div className="space-y-2 text-left">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="book-call" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Book Your Free <span className="gradient-text">Strategy Call</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Let's discuss your PM goals and create a personalized action plan.
              No sales pitch - just valuable insights and guidance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="border-0 shadow-lg h-full">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Calendar className="h-6 w-6 mr-2 text-primary" />
                    What You'll Get
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{benefit}</span>
                    </motion.div>
                  ))}
                  
                  <div className="pt-6 border-t">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>30 minutes</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground mt-2">
                      <Video className="h-4 w-4" />
                      <span>Video or phone call</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Booking Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Schedule Your Call</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          {...form.register("name")}
                          className="mt-1"
                          placeholder="Your full name"
                        />
                        {form.formState.errors.name && (
                          <p className="text-red-500 text-sm mt-1">
                            {form.formState.errors.name.message}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          {...form.register("email")}
                          className="mt-1"
                          placeholder="your.email@example.com"
                        />
                        {form.formState.errors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {form.formState.errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        {...form.register("phone")}
                        className="mt-1"
                        placeholder="(555) 123-4567"
                      />
                      {form.formState.errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.phone.message}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <Label>Preferred Time Slot</Label>
                      <Select onValueChange={(value) => form.setValue("timeSlot", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select a time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {form.formState.errors.timeSlot && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.timeSlot.message}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <Label>Call Type</Label>
                      <Select onValueChange={(value) => form.setValue("callType", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select call type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="video">Video Call (Zoom)</SelectItem>
                          <SelectItem value="phone">Phone Call</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.callType && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.callType.message}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="additionalInfo">Anything else you'd like to discuss? (Optional)</Label>
                      <Textarea
                        id="additionalInfo"
                        {...form.register("additionalInfo")}
                        className="mt-1"
                        placeholder="Any specific questions or topics you'd like to cover..."
                        rows={3}
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-6 text-lg"
                    >
                      {isSubmitting ? (
                        "Booking Your Call..."
                      ) : (
                        <>
                          Book My Free Call
                          <Phone className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}