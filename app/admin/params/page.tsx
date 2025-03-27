'use client'
import React from 'react';
import Link from "next/link";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCircle, Settings, Users, Store, ArrowLeft } from 'lucide-react';
import ProfileForm from "@/components/settings/ProfileForm";

const AdminSettings = () => {
  return (
    <div className="container max-w-5xl p-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Retour à l'accueil
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Paramètres Administrateur</h1>
          <p className="text-muted-foreground mt-1">
            Gérer les paramètres de la plateforme et les comptes utilisateurs
          </p>
        </div>
      </div>

      <div className="space-y-8 ml-5">
        {/* Section Profil */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCircle className="h-5 w-5" />
              Informations Personnelles
            </CardTitle>
            <CardDescription>
              Mettre à jour vos coordonnées et informations personnelles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileForm userRole="admin" />
          </CardContent>
        </Card>
        
        {/* Panneau d'Administration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Panneau d'Administration
            </CardTitle>
            <CardDescription>
              Accédez aux outils de gestion des utilisateurs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
            
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center hover:bg-green-300">
                  <Users className="h-6 w-6 mb-2" />
                  <Link href='/admin/gestion'>
                    Gestion des Utilisateurs
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettings;