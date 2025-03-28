"use client";

import { useState } from "react";
import { Store, Plus, Edit, Trash2 } from "lucide-react";

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
      setProducts(products.map(product =>
        product.id === editingProduct.id ? { ...newProduct, id: editingProduct.id } : product
      ));
      setEditingProduct(null);
    } else {
      setProducts([...products, { ...newProduct, id: products.length + 1 }]);
    }
    setNewProduct({ name: "", description: "", quantity: 0, category: "", condition: "", price: 0, image: "" });
    setIsFormOpen(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewProduct({ ...newProduct, image: imageUrl });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Titre avec icône à gauche et bouton à droite */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <Store className="h-8 w-8 text-black" />
              <h1 className="text-4xl font-extrabold text-gray-900">Ma Boutique</h1>
            </div>
            <p className="mt-2 text-gray-600 text-lg">
              Vous trouverez ici vos produits ajoutés et pourrez les gérer facilement.
            </p>
          </div>
          <button
            onClick={() => {
              setEditingProduct(null);
              setNewProduct({ name: "", description: "", quantity: 0, category: "", condition: "", price: 0, image: "" });
              setIsFormOpen(true);
            }}
            className="bg-black text-white px-6 py-2 rounded-full flex items-center gap-2 text-base font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Plus className="h-5 w-5" /> Ajouter un produit
          </button>
        </div>

        {/* Grille des produits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative h-48 w-full">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full mx-auto"
                />
                {/* Boutons au survol */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/60 to-transparent">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="bg-black text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-gray-800 transition-all duration-200 shadow-md"
                  >
                    <Edit className="h-4 w-4" /> Modifier
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="bg-black text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-gray-800 transition-all duration-200 shadow-md"
                  >
                    <Trash2 className="h-4 w-4" /> Supprimer
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h2>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-600"><span className="font-bold">Quantité :</span> {product.quantity}</p>
                  <p className="text-sm text-gray-600"><span className="font-bold">Catégorie :</span> {product.category}</p>
                  <p className="text-sm text-gray-600"><span className="font-bold">État :</span> {product.condition}</p>
                </div>
                <p className="text-xl font-bold text-gray-900 mt-3">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Formulaire d'ajout/modification */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white p-8 rounded-2xl w-full max-w-lg shadow-2xl transform transition-all duration-300 scale-100 max-h-[90vh] overflow-y-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {editingProduct ? "Modifier le produit" : "Ajouter un produit"}
              </h2>
              <form onSubmit={handleAddProduct} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nom du produit</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                    rows={4}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Quantité</label>
                  <input
                    type="number"
                    value={newProduct.quantity}
                    onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) || 0 })}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Catégorie</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
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
                  <label className="block text-sm font-medium text-gray-700">État</label>
                  <select
                    value={newProduct.condition}
                    onChange={(e) => setNewProduct({ ...newProduct, condition: e.target.value })}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                    required
                  >
                    <option value="">Sélectionner un état</option>
                    <option value="Neuf">Neuf</option>
                    <option value="Occasion">Occasion</option>
                    <option value="Reconditionné">Reconditionné</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Prix ($)</label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                    required={!editingProduct} // Non requis si modification
                  />
                  {newProduct.image && (
                    <img src={newProduct.image} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded-md" />
                  )}
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    {editingProduct ? "Mettre à jour" : "Ajouter"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300 shadow-md"
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