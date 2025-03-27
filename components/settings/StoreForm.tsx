import React from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Schéma de validation du formulaire
const storeFormSchema = z.object({
  storeName: z.string().min(2, { message: "Le nom de la boutique doit contenir au moins 2 caractères." }),
  storeDescription: z.string().min(10, { message: "La description doit contenir au moins 10 caractères." }),
  storeCategory: z.string({ required_error: "Veuillez sélectionner une catégorie." }),
});

type StoreFormValues = z.infer<typeof storeFormSchema>;

// Valeurs par défaut du formulaire
const defaultValues: Partial<StoreFormValues> = {
  storeName: "",
  storeDescription: "",
  storeCategory: "",
};

// Catégories disponibles pour la boutique
const storeCategories = [
  { value: "clothing", label: "Vêtements & Mode" },
  { value: "electronics", label: "Électronique" },
  { value: "home", label: "Maison & Jardin" },
  { value: "beauty", label: "Beauté & Santé" },
  { value: "sports", label: "Sports & Plein air" },
];

// Définition des props
type StoreFormProps = {
  onSubmit: (data: StoreFormValues) => void;
  isEdit?: boolean;
};

const StoreForm = ({ onSubmit, isEdit = false }: StoreFormProps) => {
  // Valeurs par défaut si en mode édition
  const editValues = isEdit ? {
    storeName: "Ma Boutique Fantastique",
    storeDescription: "Nous vendons les meilleurs produits à des prix abordables.",
    storeCategory: "clothing",
  } : defaultValues;

  // Initialisation du formulaire avec react-hook-form
  const form = useForm<StoreFormValues>({
    resolver: zodResolver(storeFormSchema),
    defaultValues: editValues,
    mode: "onChange",
  });

  // Gestionnaire de soumission du formulaire
  function handleSubmit(data: StoreFormValues) {
    onSubmit(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="storeName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de la boutique</FormLabel>
              <FormControl>
                <Input placeholder="Entrez le nom de votre boutique" {...field} />
              </FormControl>
              <FormDescription>
                C'est ainsi que votre boutique apparaîtra aux clients.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="storeDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description de la boutique</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Décrivez ce que propose votre boutique" 
                  className="resize-none" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Expliquez ce qui rend votre boutique unique.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
       
        
        <Button type="submit">
          {isEdit ? "Enregistrer les modifications" : "Créer la boutique"}
        </Button>
      </form>
    </Form>
  );
};

export default StoreForm;