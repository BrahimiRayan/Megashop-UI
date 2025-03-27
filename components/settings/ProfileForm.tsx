'use client'
import React from 'react';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Schéma de validation du formulaire
const profileFormSchema = z.object({
  fullName: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
  email: z.string().email({ message: "Veuillez entrer une adresse email valide." }),
  phone: z.string().min(8, { message: "Veuillez entrer un numéro de téléphone valide." }).optional(),
  address: z.string().min(5, { message: "L'adresse doit contenir au moins 5 caractères." }).optional(),
  bio: z.string().max(500, { message: "La biographie ne doit pas dépasser 500 caractères." }).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// Valeurs par défaut du formulaire
const defaultValues: Partial<ProfileFormValues> = {
  fullName: "Alex Johnson",
  email: "alex@example.com",
  phone: "+1 234 567 890",
  address: "123 Rue Principale, Ville, Pays",
  bio: "J'adore acheter des articles uniques.",
};

type ProfileFormProps = {
  userRole?: string;
};

const ProfileForm = ({ userRole = 'customer' }: ProfileFormProps) => {

  // Initialisation du formulaire avec react-hook-form
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  // Gestionnaire de soumission du formulaire
  function onSubmit(data: ProfileFormValues) {
    toast("Vos informations de profil ont été enregistrées avec succès.");
    console.log(data); // Appel à la base de données
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://github.com/shadcn.png" alt="Photo de profil" />
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">
              Changer la photo
            </Button>
            {/* khemass input type file  */}
          </div>
          
          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom complet</FormLabel>
                    <FormControl>
                      <Input className='border border-gray-500' placeholder="Entrez votre nom complet" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input className='border border-gray-500' type="email" placeholder="Entrez votre email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numéro de téléphone</FormLabel>
                    <FormControl>
                      <Input className='border border-gray-500' placeholder="Entrez votre numéro de téléphone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse</FormLabel>
                    <FormControl>
                      <Input className='border border-gray-500' placeholder="Entrez votre adresse" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='mb-4'>Biographie</FormLabel>
                  <FormDescription>
                    Écrivez une courte biographie qui décrit vos centres d'intérêt.
                  </FormDescription>
                  <FormControl>
                    <Textarea 
                      placeholder="Parlez-nous un peu de vous" 
                      className="resize-none border border-gray-500" 
                      {...field} 
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button type="submit">Enregistrer les modifications</Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;