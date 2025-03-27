"use client"
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";


import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "sonner"
import { Trash2, User, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';

// Mock data - Replace with your actual API calls
const mockClients = [
  { id: 1, name: "Jean Dupont", email: "jean@example.com", createdAt: "2023-05-15" },
  { id: 2, name: "Marie Laurent", email: "marie@example.com", createdAt: "2023-06-20" },
  { id: 3, name: "Pierre Martin", email: "pierre@example.com", createdAt: "2023-07-10" },
];

const mockSellers = [
  { id: 1, name: "Sophie Mercier", boutiqueName: "Élégance Mode", createdAt: "2023-04-12" },
  { id: 2, name: "Thomas Leroy", boutiqueName: "Tech Store", createdAt: "2023-05-23" },
  { id: 3, name: "Camille Petit", boutiqueName: "Maison Déco", createdAt: "2023-06-15" },
];

const GestionnairePersonnel = () => {
  const [clients, setClients] = useState(mockClients);
  const [sellers, setSellers] = useState(mockSellers);

  const deleteClient = (id: number) => {
    setClients(clients.filter(client => client.id !== id));
    toast("Le compte client a été supprimé avec succès");
  };

  const deleteSeller = (id: number) => {
    setSellers(sellers.filter(seller => seller.id !== id));
    toast("Le compte vendeur a été supprimé avec succès");
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Gestionnaire de Personnel</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Clients Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold">Clients</CardTitle>
            <User className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{clients.length}</div>
            <CardDescription>
              Nombre total de clients enregistrés
            </CardDescription>
            <div className="mt-2 text-sm text-muted-foreground">
              Dernier enregistrement: {clients.length > 0 ? clients[clients.length - 1].createdAt : "Aucun"}
            </div>
          </CardContent>
        </Card>

        {/* Sellers Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold">Vendeurs</CardTitle>
            <Users className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{sellers.length}</div>
            <CardDescription>
              Nombre total de vendeurs enregistrés
            </CardDescription>
            <div className="mt-2 text-sm text-muted-foreground">
              Boutiques actives: {sellers.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Clients Table */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Liste des Clients</h2>

        <Input 
          type='text'
          placeholder='Rechercher un client ...'
          className='border-gray-800 w-xs my-2'
          />

        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Date de création</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>{client.id}</TableCell>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Supprimer
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Êtes-vous sûr?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Cette action ne peut pas être annulée. Cela supprimera définitivement le compte
                            client et toutes les données associées.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteClient(client.id)}>
                            Supprimer
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
              {clients.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6">
                    Aucun client enregistré
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Sellers Table */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Liste des Vendeurs</h2>
        <Input 
          type='text'
          placeholder='Rechercher un Vendeur ...'
          className='border-gray-800 w-xs my-2'
          />
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nom du vendeur</TableHead>
                <TableHead>Nom de la boutique</TableHead>
                <TableHead>Date de création</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sellers.map((seller) => (
                <TableRow key={seller.id}>
                  <TableCell>{seller.id}</TableCell>
                  <TableCell>{seller.name}</TableCell>
                  <TableCell>{seller.boutiqueName}</TableCell>
                  <TableCell>{seller.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Supprimer
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Êtes-vous sûr?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Cette action ne peut pas être annulée. Cela supprimera définitivement le compte
                            vendeur, la boutique et toutes les données associées.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteSeller(seller.id)}>
                            Supprimer
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
              {sellers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6">
                    Aucun vendeur enregistré
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default GestionnairePersonnel;