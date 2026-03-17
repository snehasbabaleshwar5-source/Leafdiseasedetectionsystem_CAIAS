import { NextResponse } from 'next/server';
import { generateDiseaseSolutionAdvice } from '@/ai/flows/generative-disease-solution-advice-flow';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const image = formData.get('image');

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // In a real scenario, we'd send the image to the Flask backend
    // Since we're in a static-ish environment, we simulate the CNN output
    // and then use GenAI to get detailed info.
    
    // Simulate CNN delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock CNN results
    const diseases = ['Rust', 'Powdery Mildew', 'Leaf Spot', 'Healthy'];
    const selectedDisease = diseases[Math.floor(Math.random() * diseases.length)];
    const confidence = `${(Math.random() * 20 + 75).toFixed(1)}%`;
    
    const initialSolutions: Record<string, string> = {
      'Rust': 'Apply copper-based fungicides.',
      'Powdery Mildew': 'Increase air circulation and use sulfur sprays.',
      'Leaf Spot': 'Remove infected leaves and avoid overhead watering.',
      'Healthy': 'Your plant looks great! Continue current care.'
    };

    const initialClimates: Record<string, string> = {
      'Rust': 'Warm and humid environments.',
      'Powdery Mildew': 'High humidity with cool nights.',
      'Leaf Spot': 'Wet foliage and crowded planting.',
      'Healthy': 'Optimal growing conditions.'
    };

    if (selectedDisease === 'Healthy') {
       return NextResponse.json({
        disease: 'Healthy',
        confidence: '99.9%',
        detailedSolution: 'Continue your excellent care routine. Monitor for any changes in color or texture regularly.',
        detailedClimate: 'Your plant is thriving in its current environment. Ensure consistent light and water as per species needs.',
        timestamp: new Date().toISOString()
      });
    }

    // Use the available GenAI flow to get detailed botanist-level advice
    const aiAdvice = await generateDiseaseSolutionAdvice({
      disease: selectedDisease,
      solution: initialSolutions[selectedDisease],
      climate: initialClimates[selectedDisease]
    });

    return NextResponse.json({
      disease: selectedDisease,
      confidence,
      ...aiAdvice,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Prediction error:', error);
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
  }
}
