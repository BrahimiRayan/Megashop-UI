'use client'
import { useState, useRef } from "react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { ArrowLeft, Camera, CreditCard, User, Shield, MapPin, Phone, Settings as SettingsIcon, Building, BadgeCheck, Moon, Sun } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
}

interface AddressInfo {
  address: string;
  city: string;
  state: string;
  postalCode: string;
}

interface ContactInfo {
  phone: string;
  alternateEmail: string;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface SellerInfo {
  businessName: string;
  accountNumber: string;
  routingNumber: string;
  bio: string;
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSellerActive, setIsSellerActive] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("personal");
  
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@exemple.com",
  });
  
  const [addressInfo, setAddressInfo] = useState<AddressInfo>({
    address: "123 Rue Principale",
    city: "Paris",
    state: "Île-de-France",
    postalCode: "75001",
  });
  
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone: "+33 6 12 34 56 78",
    alternateEmail: "",
  });
  
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  const [sellerInfo, setSellerInfo] = useState<SellerInfo>({
    businessName: "",
    accountNumber: "",
    routingNumber: "",
    bio: "",
  });

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddressInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressInfo({
      ...addressInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleContactInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactInfo({
      ...contactInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSellerInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSellerInfo({
      ...sellerInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handlePersonalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Informations personnelles mises à jour avec succès");
    }, 700);
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Informations d'adresse mises à jour avec succès");
    }, 700);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Informations de contact mises à jour avec succès");
    }, 700);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Les nouveaux mots de passe ne correspondent pas");
      return;
    }
    if (passwordData.newPassword.length < 8) {
      toast.error("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Mot de passe mis à jour avec succès");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }, 700);
  };

  const handleSellerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSellerActive) {
      setIsSellerActive(true);
      toast.success("Statut de vendeur activé");
      return;
    }
    if (!sellerInfo.businessName || !sellerInfo.accountNumber || !sellerInfo.routingNumber ) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Informations du vendeur enregistrées avec succès");
    }, 700);
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-10 pb-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Paramètres du compte</h1>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="shrink-0">
            <div className="bg-white rounded-xl border shadow-sm p-4">
              <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border-2 border-gray-300">
                    {profileImage ? (
                      <Image
                        src={profileImage}
                        alt="Profil"
                        width={96}
                        height={96}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <User className="h-12 w-12 text-gray-500" />
                    )}
                  </div>
                  <button
                    onClick={triggerFileInput}
                    className="absolute bottom-0 right-0 p-1.5 rounded-full bg-black text-white hover:bg-black/80 transition-colors"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageUpload}
                    className="hidden"
                  />
                </div>
                <h2 className="text-lg font-medium">{personalInfo.firstName} {personalInfo.lastName}</h2>
                <p className="text-sm text-gray-500">{personalInfo.email}</p>
              </div>
              
              <div className="flex flex-col w-full gap-1">
                {[
                  { value: "personal", icon: User, label: "Informations" },
                  { value: "address", icon: MapPin, label: "Adresse" },
                  { value: "contact", icon: Phone, label: "Contact" },
                  { value: "security", icon: Shield, label: "Sécurité" },
                  { value: "seller", icon: CreditCard, label: "Paramètres vendeur" },
                ].map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => setActiveTab(tab.value)}
                    className={`w-full text-left px-3 py-2 flex items-center gap-2 rounded-md ${
                      activeTab === tab.value ? "bg-gray-100" : "hover:bg-gray-50"
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="w-full">
            {/* Personal Information */}
            {activeTab === "personal" && (
              <div className="bg-white rounded-xl border shadow-sm">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold">Informations personnelles</h2>
                  <p className="text-sm text-gray-500">Mettez à jour vos informations personnelles et de contact.</p>
                </div>
                <form onSubmit={handlePersonalSubmit} className="p-6 space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="block text-sm font-medium">Prénom</label>
                      <input
                        id="firstName"
                        name="firstName"
                        value={personalInfo.firstName}
                        onChange={handlePersonalInfoChange}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="block text-sm font-medium">Nom</label>
                      <input
                        id="lastName"
                        name="lastName"
                        value={personalInfo.lastName}
                        onChange={handlePersonalInfoChange}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={personalInfo.email}
                      onChange={handlePersonalInfoChange}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-black/90 disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {isLoading ? "Enregistrement..." : "Enregistrer les modifications"}
                  </button>
                </form>
              </div>
            )}

            {/* Address Information */}
            {activeTab === "address" && (
              <div className="bg-white rounded-xl border shadow-sm">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold">Informations d'adresse</h2>
                  <p className="text-sm text-gray-500">Mettez à jour vos informations d'adresse de livraison et de facturation.</p>
                </div>
                <form onSubmit={handleAddressSubmit} className="p-6 space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="address" className="block text-sm font-medium">Adresse</label>
                    <input
                      id="address"
                      name="address"
                      value={addressInfo.address}
                      onChange={handleAddressInfoChange}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="city" className="block text-sm font-medium">Ville</label>
                      <input
                        id="city"
                        name="city"
                        value={addressInfo.city}
                        onChange={handleAddressInfoChange}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="state" className="block text-sm font-medium">Région / Département</label>
                      <input
                        id="state"
                        name="state"
                        value={addressInfo.state}
                        onChange={handleAddressInfoChange}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="postalCode" className="block text-sm font-medium">Code postal</label>
                      <input
                        id="postalCode"
                        name="postalCode"
                        value={addressInfo.postalCode}
                        onChange={handleAddressInfoChange}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-black/90 disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {isLoading ? "Enregistrement..." : "Enregistrer les modifications"}
                  </button>
                </form>
              </div>
            )}

            {/* Contact Information */}
            {activeTab === "contact" && (
              <div className="bg-white rounded-xl border shadow-sm">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold">Informations de contact</h2>
                  <p className="text-sm text-gray-500">Mettez à jour vos coordonnées pour les notifications de commande.</p>
                </div>
                <form onSubmit={handleContactSubmit} className="p-6 space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium">Numéro de téléphone</label>
                    <input
                      id="phone"
                      name="phone"
                      value={contactInfo.phone}
                      onChange={handleContactInfoChange}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Utilisé pour les mises à jour de commande et les notifications de livraison
                    </p>
                  </div>
               
                  <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-black/90 disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {isLoading ? "Enregistrement..." : "Enregistrer les modifications"}
                  </button>
                </form>
              </div>
            )}

            {/* Security */}
            {activeTab === "security" && (
              <>
                <div className="bg-white rounded-xl border shadow-sm">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <Shield className="h-5 w-5 text-blue-500" />
                      Changer le mot de passe
                    </h2>
                    <p className="text-sm text-gray-500">Mettez à jour votre mot de passe pour sécuriser votre compte</p>
                  </div>
                  <form onSubmit={handlePasswordSubmit} className="p-6 space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="currentPassword" className="block text-sm font-medium">Mot de passe actuel</label>
                      <input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="newPassword" className="block text-sm font-medium">Nouveau mot de passe</label>
                      <input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirmer le nouveau mot de passe</label>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-black text-white px-4 py-2 rounded-md hover:bg-black/90 disabled:opacity-50"
                      disabled={isLoading}
                    >
                      {isLoading ? "Mise à jour..." : "Mettre à jour le mot de passe"}
                    </button>
                  </form>
                </div>
              </>
            )}

            {/* Seller Settings */}
            {activeTab === "seller" && (
              <>
                <div className="bg-white rounded-xl border shadow-sm">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <BadgeCheck className="h-5 w-5 text-blue-500" />
                      Statut de vendeur
                    </h2>
                    <p className="text-sm text-gray-500">Activez votre compte vendeur pour commencer à vendre des produits</p>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Devenir vendeur</h4>
                        <p className="text-sm text-gray-500">Activez les fonctionnalités vendeur sur votre compte</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isSellerActive}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsSellerActive(e.target.checked)}
                          className="sr-only"
                        />
                        <div className={`w-11 h-6 rounded-full ${isSellerActive ? "bg-black" : "bg-gray-200"}`}></div>
                        <div className={`absolute w-5 h-5 bg-white rounded-full transition-transform ${isSellerActive ? "translate-x-5" : "translate-x-1"}`}></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                {isSellerActive && (
                  <form onSubmit={handleSellerSubmit} className="space-y-6 mt-6">
                    <div className="bg-white rounded-xl border shadow-sm">
                      <div className="p-6 border-b">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                          <Building className="h-5 w-5 text-blue-500" />
                          Informations sur l'entreprise
                        </h2>
                        <p className="text-sm text-gray-500">Fournissez des détails sur votre entreprise</p>
                      </div>
                      <div className="p-6 space-y-4">
                        <div className="space-y-2">
                          <label htmlFor="businessName" className="block text-sm font-medium">Nom de l'entreprise</label>
                          <input
                            id="businessName"
                            name="businessName"
                            value={sellerInfo.businessName}
                            onChange={handleSellerInfoChange}
                            required
                            className="w-full px-3 py-2 border rounded-md"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="bio" className="block text-sm font-medium">Bio (description)</label>
                          <input
                            id="bio"
                            name="bio"
                            value={sellerInfo.bio}
                            onChange={handleSellerInfoChange}
                            className="w-full px-3 py-2 border rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl border shadow-sm">
                      <div className="p-6 border-b">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                          <CreditCard className="h-5 w-5 text-blue-500" />
                          Coordonnées bancaires
                        </h2>
                        <p className="text-sm text-gray-500">Ajoutez vos informations bancaires pour les paiements</p>
                      </div>
                      <div className="p-6 space-y-4">
                        <div className="grid gap-6 sm:grid-cols-2">
                          <div className="space-y-2">
                            <label htmlFor="accountNumber" className="block text-sm font-medium">Numéro de compte</label>
                            <input
                              id="accountNumber"
                              name="accountNumber"
                              value={sellerInfo.accountNumber}
                              onChange={handleSellerInfoChange}
                              required
                              className="w-full px-3 py-2 border rounded-md"
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="routingNumber" className="block text-sm font-medium">Code banque</label>
                            <input
                              id="routingNumber"
                              name="routingNumber"
                              value={sellerInfo.routingNumber}
                              onChange={handleSellerInfoChange}
                              required
                              className="w-full px-3 py-2 border rounded-md"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="p-6 border-t">
                        <button
                          type="submit"
                          className="bg-black text-white px-4 py-2 rounded-md hover:bg-black/90 disabled:opacity-50"
                          disabled={isLoading}
                        >
                          {isLoading ? "Enregistrement..." : "Enregistrer les coordonnées bancaires"}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}