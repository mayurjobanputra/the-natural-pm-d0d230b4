import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  experience: z.string().min(1, "Please select your experience level"),
  background: z.string().min(1, "Please select your background"),
  goal: z.string().min(1, "Please select your goal"),
  challenge: z.string().min(10, "Please describe your biggest challenge"),
  timeline: z.string().min(1, "Please select your timeline")
});

type FormData = z.infer<typeof formSchema>;

interface AssessmentFormProps {
  onComplete: (data: FormData) => void;
}

const questions = [
  {
    id: "basics",
    title: "Let's Start With The Basics",
    fields: ["name", "email"]
  },
  {
    id: "experience",
    title: "What's Your Current Experience?",
    fields: ["experience", "background"]
  },
  {
    id: "goals",
    title: "What Are Your PM Goals?",
    fields: ["goal", "timeline"]
  },
  {
    id: "challenges",
    title: "What's Your Biggest Challenge?",
    fields: ["challenge"]
  }
];

export function AssessmentForm({ onComplete }: AssessmentFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      experience: "",
      background: "",
      goal: "",
      challenge: "",
      timeline: ""
    }
  });

  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleNext = async () => {
    const currentQuestion = questions[currentStep];
    const isValid = await form.trigger(currentQuestion.fields as any);
    
    if (isValid) {
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const data = form.getValues();
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Assessment completed successfully!");
      onComplete(data);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderQuestion = () => {
    const question = questions[currentStep];
    
    switch (question.id) {
      case "basics":
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-base font-medium">What's your name?</Label>
              <Input
                id="name"
                {...form.register("name")}
                className="mt-2 text-lg p-6"
                placeholder="Enter your full name"
              />
              {form.formState.errors.name && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="email" className="text-base font-medium">What's your email address?</Label>
              <Input
                id="email"
                type="email"
                {...form.register("email")}
                className="mt-2 text-lg p-6"
                placeholder="Enter your email address"
              />
              {form.formState.errors.email && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
              )}
            </div>
          </div>
        );
        
      case "experience":
        return (
          <div className="space-y-8">
            <div>
              <Label className="text-base font-medium mb-4 block">What's your current experience level?</Label>
              <RadioGroup
                value={form.watch("experience")}
                onValueChange={(value) => form.setValue("experience", value)}
                className="space-y-3"
              >
                {[
                  { value: "complete-beginner", label: "Complete beginner - No PM experience" },
                  { value: "some-exposure", label: "Some exposure - Worked with PMs before" },
                  { value: "junior-role", label: "In a junior role - Want to transition to PM" },
                  { value: "some-pm-tasks", label: "Doing some PM tasks - Want to formalize it" }
                ].map((option) => (
                  <div key={option.value} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="flex-1 cursor-pointer">{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
              {form.formState.errors.experience && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.experience.message}</p>
              )}
            </div>
            
            <div>
              <Label className="text-base font-medium mb-4 block">What's your professional background?</Label>
              <RadioGroup
                value={form.watch("background")}
                onValueChange={(value) => form.setValue("background", value)}
                className="space-y-3"
              >
                {[
                  { value: "engineering", label: "Engineering/Technical" },
                  { value: "design", label: "Design/UX" },
                  { value: "business", label: "Business/Strategy" },
                  { value: "marketing", label: "Marketing/Growth" },
                  { value: "consulting", label: "Consulting" },
                  { value: "other", label: "Other" }
                ].map((option) => (
                  <div key={option.value} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="flex-1 cursor-pointer">{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
              {form.formState.errors.background && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.background.message}</p>
              )}
            </div>
          </div>
        );
        
      case "goals":
        return (
          <div className="space-y-8">
            <div>
              <Label className="text-base font-medium mb-4 block">What's your primary PM goal?</Label>
              <RadioGroup
                value={form.watch("goal")}
                onValueChange={(value) => form.setValue("goal", value)}
                className="space-y-3"
              >
                {[
                  { value: "first-pm-job", label: "Land my first PM job" },
                  { value: "transition-internally", label: "Transition to PM within my current company" },
                  { value: "better-pm-job", label: "Get a better PM job at a top company" },
                  { value: "pm-skills", label: "Develop stronger PM skills and confidence" }
                ].map((option) => (
                  <div key={option.value} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="flex-1 cursor-pointer">{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
              {form.formState.errors.goal && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.goal.message}</p>
              )}
            </div>
            
            <div>
              <Label className="text-base font-medium mb-4 block">What's your timeline?</Label>
              <RadioGroup
                value={form.watch("timeline")}
                onValueChange={(value) => form.setValue("timeline", value)}
                className="space-y-3"
              >
                {[
                  { value: "asap", label: "ASAP - I need to make this transition now" },
                  { value: "3-months", label: "Within 3 months" },
                  { value: "6-months", label: "Within 6 months" },
                  { value: "1-year", label: "Within a year" }
                ].map((option) => (
                  <div key={option.value} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="flex-1 cursor-pointer">{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
              {form.formState.errors.timeline && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.timeline.message}</p>
              )}
            </div>
          </div>
        );
        
      case "challenges":
        return (
          <div>
            <Label htmlFor="challenge" className="text-base font-medium mb-4 block">
              What's your biggest challenge in becoming a PM?
            </Label>
            <Textarea
              id="challenge"
              {...form.register("challenge")}
              className="min-h-[120px] text-base p-4"
              placeholder="Describe what's holding you back from landing your ideal PM role..."
            />
            {form.formState.errors.challenge && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.challenge.message}</p>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <section id="assessment" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="border-0 shadow-xl">
              <CardHeader className="text-center pb-6">
                <div className="mb-4">
                  <Progress value={progress} className="w-full h-2" />
                  <p className="text-sm text-muted-foreground mt-2">
                    Step {currentStep + 1} of {questions.length}
                  </p>
                </div>
                <CardTitle className="text-2xl md:text-3xl font-bold">
                  {questions[currentStep].title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-8">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {renderQuestion()}
                </motion.div>
                
                <div className="flex justify-between mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className="px-6"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className="px-6"
                  >
                    {isSubmitting ? (
                      "Processing..."
                    ) : currentStep === questions.length - 1 ? (
                      <>
                        Complete Assessment
                        <CheckCircle className="w-4 h-4 ml-2" />
                      </>
                    ) : (
                      <>
                        Next
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}