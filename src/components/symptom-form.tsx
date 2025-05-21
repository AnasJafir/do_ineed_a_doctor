"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUp, SendHorizonal, Loader2 } from "lucide-react";
import type { AppTranslations } from "@/lib/translations";
import { useState, type ChangeEvent } from "react";
import Image from "next/image";

const symptomFormSchema = z.object({
  symptoms: z.string().min(10, { message: "Please describe your symptoms in at least 10 characters." }),
  photo: z.instanceof(File).optional(),
});

export type SymptomFormData = z.infer<typeof symptomFormSchema>;

interface SymptomFormProps {
  onSubmit: (data: SymptomFormData) => Promise<void>;
  isLoading: boolean;
  translations: AppTranslations;
}

export function SymptomForm({ onSubmit, isLoading, translations }: SymptomFormProps) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const form = useForm<SymptomFormData>({
    resolver: zodResolver(symptomFormSchema),
    defaultValues: {
      symptoms: "",
    },
  });

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("photo", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      form.setValue("photo", undefined);
      setPhotoPreview(null);
    }
  };

  const handleSubmit: SubmitHandler<SymptomFormData> = async (data) => {
    await onSubmit(data);
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">{translations.pageTitle}</CardTitle>
        <CardDescription>{translations.poweredByAI}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="symptoms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">{translations.symptomsLabel}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={translations.symptomsPlaceholder}
                      className="min-h-[120px] resize-none text-base"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="photo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg flex items-center gap-2">
                     <ImageUp size={20} /> {translations.uploadPhotoLabel}
                  </FormLabel>
                  <FormControl>
                     <Input 
                      type="file" 
                      accept="image/*" 
                      onChange={handlePhotoChange} 
                      disabled={isLoading}
                      className="text-base file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    />
                  </FormControl>
                   <p className="text-sm text-muted-foreground">{translations.uploadPhotoHint}</p>
                  <FormMessage />
                </FormItem>
              )}
            />

            {photoPreview && (
              <div className="mt-4">
                <Image
                  src={photoPreview}
                  alt={translations.photoPreviewAlt}
                  width={200}
                  height={200}
                  className="rounded-md object-cover max-h-[200px] w-auto"
                  data-ai-hint="medical image"
                />
              </div>
            )}
            
            <Button type="submit" className="w-full text-lg py-6" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {translations.submittingButton}
                </>
              ) : (
                <>
                  <SendHorizonal className="mr-2 h-5 w-5" />
                  {translations.submitButton}
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
