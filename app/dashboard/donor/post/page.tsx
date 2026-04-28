"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  ArrowLeft, 
  ArrowRight, 
  Upload, 
  MapPin, 
  Clock, 
  Check,
  X,
  Image as ImageIcon
} from "lucide-react"

const categories = [
  { id: "cooked", label: "Cooked Meals", icon: "🍲" },
  { id: "fresh", label: "Fresh Produce", icon: "🥗" },
  { id: "bakery", label: "Bakery Items", icon: "🍞" },
  { id: "dairy", label: "Dairy Products", icon: "🥛" },
  { id: "packaged", label: "Packaged Food", icon: "📦" },
  { id: "beverages", label: "Beverages", icon: "🧃" },
]

const steps = [
  { id: 1, label: "Food Details" },
  { id: 2, label: "Location & Time" },
  { id: 3, label: "Review" },
]

export default function PostDonationPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    foodName: "",
    category: "",
    quantity: "",
    unit: "kg",
    description: "",
    expiryHours: "24",
    images: [] as string[],
    address: "",
    pickupStart: "",
    pickupEnd: "",
    notes: "",
  })

  const handleImageUpload = () => {
    // Simulate image upload
    setFormData({
      ...formData,
      images: [...formData.images, `/placeholder-food-${formData.images.length + 1}.jpg`]
    })
  }

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    })
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    router.push("/dashboard/donor?success=donation-posted")
  }

  const canProceed = () => {
    if (currentStep === 1) {
      return formData.foodName && formData.category && formData.quantity
    }
    if (currentStep === 2) {
      return formData.address && formData.pickupStart && formData.pickupEnd
    }
    return true
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </button>
        <h1 className="text-2xl font-bold text-foreground">Post a Donation</h1>
        <p className="text-muted-foreground">Share your surplus food with those who need it</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                  currentStep >= step.id 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                }`}>
                  {currentStep > step.id ? <Check className="h-5 w-5" /> : step.id}
                </div>
                <span className={`hidden sm:block text-sm font-medium ${
                  currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${
                  currentStep > step.id ? "bg-primary" : "bg-muted"
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2 glass-card rounded-3xl p-6">
          {/* Step 1: Food Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="foodName">Food Name *</Label>
                <Input
                  id="foodName"
                  placeholder="e.g., Fresh Vegetable Mix"
                  value={formData.foodName}
                  onChange={(e) => setFormData({ ...formData, foodName: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Category *</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: cat.id })}
                      className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all ${
                        formData.category === cat.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <span className="text-xl">{cat.icon}</span>
                      <span className="text-sm font-medium text-foreground">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="e.g., 10"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <select
                    id="unit"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="kg">Kilograms (kg)</option>
                    <option value="items">Items</option>
                    <option value="portions">Portions</option>
                    <option value="liters">Liters (L)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiryHours">Best Before (hours)</Label>
                <select
                  id="expiryHours"
                  value={formData.expiryHours}
                  onChange={(e) => setFormData({ ...formData, expiryHours: e.target.value })}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="6">6 hours</option>
                  <option value="12">12 hours</option>
                  <option value="24">24 hours</option>
                  <option value="48">48 hours</option>
                  <option value="72">72 hours</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Any additional details about the food..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Photos</Label>
                <div className="flex flex-wrap gap-3">
                  {formData.images.map((img, index) => (
                    <div key={index} className="relative h-24 w-24 rounded-xl bg-muted overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 p-1 rounded-full bg-destructive text-destructive-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleImageUpload}
                    className="flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-border hover:border-primary/50 transition-colors"
                  >
                    <Upload className="h-6 w-6 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Upload</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Location & Time */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="address">Pickup Address *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Textarea
                    id="address"
                    placeholder="Enter your full address..."
                    className="pl-10"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={2}
                  />
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  <MapPin className="mr-2 h-4 w-4" />
                  Use Current Location
                </Button>
              </div>

              {/* Map Placeholder */}
              <div className="h-48 rounded-xl bg-muted flex items-center justify-center border border-border">
                <div className="text-center">
                  <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Map preview will appear here</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="pickupStart">Available From *</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="pickupStart"
                      type="time"
                      className="pl-10"
                      value={formData.pickupStart}
                      onChange={(e) => setFormData({ ...formData, pickupStart: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pickupEnd">Available Until *</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="pickupEnd"
                      type="time"
                      className="pl-10"
                      value={formData.pickupEnd}
                      onChange={(e) => setFormData({ ...formData, pickupEnd: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Pickup Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any special instructions for pickup..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={2}
                />
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="rounded-xl bg-muted/30 p-6 space-y-4">
                <h3 className="font-semibold text-foreground">Food Details</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Food Name</p>
                    <p className="font-medium text-foreground">{formData.foodName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p className="font-medium text-foreground capitalize">{formData.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Quantity</p>
                    <p className="font-medium text-foreground">{formData.quantity} {formData.unit}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Best Before</p>
                    <p className="font-medium text-foreground">{formData.expiryHours} hours</p>
                  </div>
                </div>
                {formData.description && (
                  <div>
                    <p className="text-sm text-muted-foreground">Description</p>
                    <p className="font-medium text-foreground">{formData.description}</p>
                  </div>
                )}
              </div>

              <div className="rounded-xl bg-muted/30 p-6 space-y-4">
                <h3 className="font-semibold text-foreground">Pickup Details</h3>
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium text-foreground">{formData.address}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Available Time</p>
                  <p className="font-medium text-foreground">{formData.pickupStart} - {formData.pickupEnd}</p>
                </div>
                {formData.notes && (
                  <div>
                    <p className="text-sm text-muted-foreground">Notes</p>
                    <p className="font-medium text-foreground">{formData.notes}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(currentStep - 1)}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            
            {currentStep < 3 ? (
              <Button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!canProceed()}
                className="glow-primary"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="glow-primary"
              >
                {isSubmitting ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : (
                  <>
                    Post Donation
                    <Check className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Preview Card */}
        <div className="glass-card rounded-3xl p-6 h-fit sticky top-24">
          <h3 className="font-semibold text-foreground mb-4">Preview</h3>
          <div className="rounded-xl bg-muted/30 overflow-hidden">
            <div className="h-32 bg-muted flex items-center justify-center">
              {formData.images.length > 0 ? (
                <ImageIcon className="h-12 w-12 text-muted-foreground" />
              ) : (
                <div className="text-center">
                  <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">No image</p>
                </div>
              )}
            </div>
            <div className="p-4">
              <h4 className="font-medium text-foreground">
                {formData.foodName || "Food Name"}
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                {formData.quantity || "0"} {formData.unit} • {categories.find(c => c.id === formData.category)?.label || "Category"}
              </p>
              {formData.address && (
                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{formData.address}</span>
                </div>
              )}
              {formData.pickupStart && formData.pickupEnd && (
                <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{formData.pickupStart} - {formData.pickupEnd}</span>
                </div>
              )}
            </div>
          </div>

          {/* Tips */}
          <div className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/20">
            <h4 className="text-sm font-medium text-primary mb-2">Tips for donors</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Add clear photos for faster matching</li>
              <li>• Be specific about quantity and type</li>
              <li>• Set realistic pickup windows</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
