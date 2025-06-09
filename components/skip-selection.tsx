"use client"

import { useEffect, useState } from "react"
import { SkipCard } from "./skip-card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, Recycle, TreePine } from "lucide-react"
import type { Skip } from "@/types/skip"


export function SkipSelection() {
  const [selectedSkip, setSelectedSkip] = useState<number | null>(null)
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkips = async () => {
      try {
        const res = await fetch(
          "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
        );
        const data: Skip[] = await res.json();
        setSkips(data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkips();
  }, []);

  if (loading) return <p>Carregando...</p>;

  const handleSkipSelect = (skipId: number) => {
    setSelectedSkip(skipId)
  }

  const handleContinue = () => {
    if (selectedSkip) {
      console.log("Continuing with skip ID:", selectedSkip)
      // Handle navigation to next step
    }
  }

  const selectedSkipData = skips.find((skip) => skip.id === selectedSkip)
  const availableSkips = skips.filter((skip) => !skip.forbidden)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full">
              <Recycle className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
              Choose Your Eco Skip
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Select the perfect skip size for your project in{" "}
            <span className="font-semibold text-green-700">{skips[0]?.postcode}</span>. All our skips come with{" "}
            <span className="font-semibold text-green-700">carbon-neutral collection</span> and{" "}
            <span className="font-semibold text-green-700">95% waste recycling</span> guarantee.
          </p>

          {/* Environmental Stats */}
          <div className="flex items-center justify-center gap-8 mt-8 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-green-200/50 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-green-700 mb-1">
                <TreePine className="h-5 w-5" />
                <span className="font-bold text-lg">95%</span>
              </div>
              <span className="text-sm text-gray-600">Waste Recycled</span>
            </div>
            <div className="w-px h-8 bg-green-200" />
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-green-700 mb-1">
                <Leaf className="h-5 w-5" />
                <span className="font-bold text-lg">{availableSkips.length}</span>
              </div>
              <span className="text-sm text-gray-600">Available Sizes</span>
            </div>
            <div className="w-px h-8 bg-green-200" />
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-green-700 mb-1">
                <Recycle className="h-5 w-5" />
                <span className="font-bold text-lg">100%</span>
              </div>
              <span className="text-sm text-gray-600">Eco Friendly</span>
            </div>
          </div>
        </div>

        {/* Skip Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {skips.map((skip) => (
            <SkipCard key={skip.id} skip={skip} onSelect={handleSkipSelect} selected={selectedSkip === skip.id} />
          ))}
        </div>

         {/* Continue Button - Absolute Positioned */}
        {selectedSkip && selectedSkipData && (
          <div className="fixed top-8 right-8 z-50 animate-in slide-in-from-right-5 duration-400">
            <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-green-200/50 shadow-2xl max-w-sm">
              <div className="text-right mb-3">
                <p className="text-green-700 font-medium text-sm mb-1 flex items-center justify-end gap-1">
                  <span>Great, selection Complete!</span>
                  <span className="text-lg">🌱</span>
                </p>
                <p className="text-xs text-gray-600 mb-1">{selectedSkipData.size} yard skip selected</p>
                <p className="text-sm font-semibold text-gray-800">
                  Total: £{Math.round(selectedSkipData.price_before_vat * (1 + selectedSkipData.vat / 100))} (inc. VAT)
                </p>
              </div>
              <Button
                onClick={handleContinue}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-6 py-3 hover:text-gray-100   text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-400"
              >
                <Leaf className="mr-2 h-4 w-4" />
                Continue to Permit Check
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
