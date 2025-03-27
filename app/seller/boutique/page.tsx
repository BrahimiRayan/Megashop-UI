"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Edit, Trash2 } from "lucide-react";

interface Product {
  id: number;
  name: string;
  description: string;
  quantity: number;
  category: string;
  condition: string;
  price: number;
  image: string;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "T-shirt Vintage", description: "T-shirt rétro des années 90", quantity: 5, category: "Vêtements", condition: "Neuf", price: 29.99, image: "https://zpacks.com/cdn/shop/files/Zpacks-TrailCoolMerinoWoolT-Shirt-01_2048x.jpg?v=1686743695" },
    { id: 2, name: "Chaussures Sport", description: "Chaussures de running légères", quantity: 3, category: "Chaussures", condition: "Occasion", price: 49.99, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo6LK_u-MJ_6XoI6kBNeF7UIwgcTxlOHA-BA&s" },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    quantity: 0,
    category: "",
    condition: "",
    price: 0,
    image: "",
  });

  const handleDeleteProduct = (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      description: product.description,
      quantity: product.quantity,
      category: product.category,
      condition: product.condition,
      price: product.price,
      image: product.image,
    });
    setIsFormOpen(true);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      // Mise à jour du produit existant
      setProducts(products.map(product =>
        product.id === editingProduct.id ? { ...newProduct, id: editingProduct.id } : product
      ));
      setEditingProduct(null);
    } else {
      // Ajout d'un nouveau produit
      setProducts([...products, { ...newProduct, id: products.length + 1 }]);
    }
    setNewProduct({ name: "", description: "", quantity: 0, category: "", condition: "", price: 0, image: "" });
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Ma Boutique</h1>

        {/* Grille des produits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64">
                <img 
                  className="h-full border mx-auto"
                  src={product.image} alt="" 
                />
                {/* Boutons d'action au survol */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="bg-white text-black px-4 py-2 rounded-full flex items-center gap-2 hover:bg-gray-200 transition-colors"
                  >
                    <Edit className="h-4 w-4" /> Modifier
                  </button>
                 
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" /> Supprimer
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="text-sm mt-2">Quantité : {product.quantity}</p>
                <p className="text-sm">Catégorie : {product.category}</p>
                <p className="text-sm">État : {product.condition}</p>
                <p className="text-lg font-bold mt-2">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bouton Ajouter un produit */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => {
              setEditingProduct(null);
              setNewProduct({ name: "", description: "", quantity: 0, category: "", condition: "", price: 0, image: "" });
              setIsFormOpen(true);
            }}
            className="bg-black text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-gray-800 transition-colors"
          >
            <Plus className="h-5 w-5" /> Ajouter un produit
          </button>
        </div>

        {/* Formulaire d'ajout/modification de produit */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl h-[90%] overflow-y-scroll">
              <h2 className="text-2xl font-bold mb-4">
                {editingProduct ? "Modifier le produit" : "Ajouter un produit"}
              </h2>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Nom du produit</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Description</label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Quantité</label>
                  <input
                    type="number"
                    value={newProduct.quantity}
                    onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border rounded-md"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Catégorie</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  >
                    <option value="">Sélectionner une catégorie</option>
                    <option value="Vêtements">Vêtements</option>
                    <option value="Chaussures">Chaussures</option>
                    <option value="Électronique">Électronique</option>
                    <option value="Maison">Maison</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium">État</label>
                  <select
                    value={newProduct.condition}
                    onChange={(e) => setNewProduct({ ...newProduct, condition: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  >
                    <option value="">Sélectionner un état</option>
                    <option value="Neuf">Neuf</option>
                    <option value="Occasion">Occasion</option>
                    <option value="Reconditionné">Reconditionné</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium">Prix ($)</label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border rounded-md"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Image (URL)</label>
                  <input
                    type="text"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="ex: /image.jpg"
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                  >
                    {editingProduct ? "Mettre à jour" : "Ajouter"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}