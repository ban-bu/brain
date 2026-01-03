import React, { useRef, useState, useEffect } from 'react';
import { GameSessionProps } from '../../types';
import { RefreshCw, Check } from 'lucide-react';

const MirrorCoordination: React.FC<GameSessionProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [template, setTemplate] = useState(0);

  const drawTemplate = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    
    // Draw Divider
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.strokeStyle = '#e2e8f0';
    ctx.setLineDash([5, 5]);
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw Template Shape
    ctx.beginPath();
    ctx.strokeStyle = '#e2e8f0'; // Light gray guide
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    
    // Scale shapes based on canvas size
    const scale = Math.min(width, height) / 400; 

    if (template === 0) { // Circle
       const r = 60 * scale;
       ctx.arc(width/4, height/2, r, 0, Math.PI * 2);
       ctx.moveTo(width * 0.75 + r, height/2); // Move to start of right circle
       ctx.arc(width * 0.75, height/2, r, 0, Math.PI * 2);
    } else if (template === 1) { // Square
       const size = 120 * scale;
       ctx.rect(width/4 - size/2, height/2 - size/2, size, size);
       ctx.rect(width * 0.75 - size/2, height/2 - size/2, size, size);
    } else { // Infinity/Figure 8
       const offset = 60 * scale;
       ctx.moveTo(width/4, height/2 - offset);
       ctx.bezierCurveTo(width/4 + offset, height/2 - offset, width/4 + offset, height/2 + offset, width/4, height/2 + offset);
       ctx.bezierCurveTo(width/4 - offset, height/2 + offset, width/4 - offset, height/2 - offset, width/4, height/2 - offset);
       
       // Mirror side
       const rX = width * 0.75;
       ctx.moveTo(rX, height/2 - offset);
       ctx.bezierCurveTo(rX - offset, height/2 - offset, rX - offset, height/2 + offset, rX, height/2 + offset);
       ctx.bezierCurveTo(rX + offset, height/2 + offset, rX + offset, height/2 - offset, rX, height/2 - offset);
    }
    
    ctx.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.parentElement?.clientWidth || 300;
      canvas.height = canvas.parentElement?.clientHeight || 400;
      const ctx = canvas.getContext('2d');
      if (ctx) drawTemplate(ctx, canvas.width, canvas.height);
    }
  }, [template]);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    // e.preventDefault(); // Prevents scrolling on some devices
    setIsDrawing(true);
    const { x, y } = getPos(e);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx && canvas) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.strokeStyle = '#8b5cf6'; // Violet for user
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    // e.preventDefault();
    const { x, y } = getPos(e);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (ctx && canvas) {
      // Draw User Line
      ctx.lineTo(x, y);
      ctx.stroke();

      // Calculate Mirror Line (Mirror across center X)
      const centerX = canvas.width / 2;
      const distFromCenter = x - centerX;
      const mirrorX = centerX - distFromCenter;
      
      // We need a separate path for the mirror stroke to avoid connecting the two sides
      ctx.beginPath();
      ctx.fillStyle = '#8b5cf6';
      ctx.fillRect(mirrorX, y, 4, 4); // Simple dot mirroring
      
      // Restore path for continuous drawing
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const nextPattern = () => {
    setTemplate((prev) => (prev + 1) % 3);
  };

  return (
    <div className="flex flex-col items-center h-full w-full justify-between">
      <div className="mb-4 text-center shrink-0">
        <h3 className="text-lg font-bold text-slate-700">双侧镜像描摹</h3>
        <p className="text-xs md:text-sm text-slate-500">在任意一侧绘画，笔迹会实时镜像。</p>
      </div>

      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200 overflow-hidden cursor-crosshair flex-1 min-h-[50vh] max-h-[60vh]">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="touch-none w-full h-full block"
        />
      </div>

      <div className="mt-6 flex gap-3 w-full max-w-sm shrink-0">
        <button 
          onClick={nextPattern}
          className="flex-1 flex justify-center items-center gap-2 px-4 py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition active:scale-95"
        >
          <RefreshCw size={18} /> 图形
        </button>
        <button 
          onClick={() => onComplete(100)}
          className="flex-1 flex justify-center items-center gap-2 px-4 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition shadow-lg shadow-slate-900/20 active:scale-95"
        >
          <Check size={18} /> 完成
        </button>
      </div>
    </div>
  );
};

export default MirrorCoordination;