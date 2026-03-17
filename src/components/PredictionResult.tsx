"use client"

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Leaf, Thermometer, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PredictionResultProps {
  result: {
    disease: string;
    confidence: string;
    detailedSolution: string;
    detailedClimate: string;
    imageUrl?: string;
  };
  onReset: () => void;
}

export function PredictionResult({ result, onReset }: PredictionResultProps) {
  const isHealthy = result.disease.toLowerCase() === 'healthy';

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Image Card */}
        <Card className="overflow-hidden shadow-xl border-primary/20 border-2">
          <div className="relative aspect-[4/3]">
             {result.imageUrl && <img src={result.imageUrl} alt="Captured Leaf" className="w-full h-full object-cover" />}
             <div className="absolute top-4 left-4">
               <Badge className={isHealthy ? "bg-green-500 hover:bg-green-600" : "bg-orange-500 hover:bg-orange-600"}>
                 {result.disease}
               </Badge>
             </div>
          </div>
        </Card>

        {/* Prediction Stats Card */}
        <div className="space-y-4">
          <Card className="bg-white/80 backdrop-blur-md shadow-lg border-primary/10">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-headline flex items-center gap-2">
                  <Leaf className="text-primary" /> Diagnosis
                </CardTitle>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Confidence</p>
                  <p className="text-lg font-bold text-primary">{result.confidence}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className={`text-2xl font-bold mb-4 ${isHealthy ? 'text-primary' : 'text-orange-600'}`}>
                {isHealthy ? 'Perfectly Healthy!' : result.disease}
              </h3>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="bg-accent/20 p-2 rounded-lg h-fit">
                    <ShieldCheck className="text-primary" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Recommended Action</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{result.detailedSolution}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg h-fit">
                    <Thermometer className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Environmental Context</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{result.detailedClimate}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Button 
            onClick={onReset} 
            className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold flex items-center justify-center gap-2 group"
          >
            Scan Another Plant <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
}
