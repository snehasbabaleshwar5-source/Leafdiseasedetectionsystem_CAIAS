"use client"

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { NatureDecor } from '@/components/NatureDecor';
import { ChevronLeft, History, Trash2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { format } from 'date-fns';

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('scanHistory');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const clearHistory = () => {
    if (confirm("Clear all scan history?")) {
      localStorage.removeItem('scanHistory');
      setHistory([]);
    }
  };

  return (
    <div className="min-h-screen relative bg-background pb-12">
      <NatureDecor />
      
      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <Link href="/" className="inline-flex items-center text-primary hover:underline mb-4 gap-1 font-medium">
              <ChevronLeft size={20} /> Back to Home
            </Link>
            <h2 className="text-3xl font-bold font-headline flex items-center gap-3">
              <History className="text-primary" /> Scan History
            </h2>
          </div>
          
          {history.length > 0 && (
            <Button variant="ghost" className="text-destructive hover:bg-destructive/10" onClick={clearHistory}>
              <Trash2 size={18} className="mr-2" /> Clear History
            </Button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border-2 border-dashed border-primary/20">
            <History size={48} className="mx-auto text-primary/20 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No scans found</h3>
            <p className="text-muted-foreground mb-6">Start your first leaf diagnosis to see them here.</p>
            <Link href="/scan">
              <Button className="rounded-full px-8 bg-primary">Start New Scan</Button>
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((scan) => (
              <Card key={scan.id} className="overflow-hidden shadow-md hover:shadow-xl transition-shadow border-primary/10 bg-white/80 backdrop-blur-sm group">
                <div className="relative aspect-video overflow-hidden">
                  <img src={scan.imageUrl} alt={scan.disease} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-2 right-2">
                    <Badge className={scan.disease.toLowerCase() === 'healthy' ? "bg-green-500" : "bg-orange-500"}>
                      {scan.disease}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{scan.disease}</CardTitle>
                    <span className="text-xs text-muted-foreground">{format(new Date(scan.timestamp), 'MMM d, h:mm a')}</span>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                    {scan.detailedSolution}
                  </p>
                  <Link href="/scan">
                    <Button variant="outline" size="sm" className="w-full text-xs h-8 border-primary/20 text-primary hover:bg-primary/5">
                      View Details <ExternalLink size={12} className="ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
