import React from 'react';

export function WhyChooseUs() {
  return (
    <div className="bg-gray-900 text-white rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Why Choose Us</h2>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span>✨</span>
          <p>Michelin-starred dining experience</p>
        </div>
        <div className="flex items-center gap-2">
          <span>🍷</span>
          <p>Extensive wine collection</p>
        </div>
        <div className="flex items-center gap-2">
          <span>👨‍🍳</span>
          <p>World-renowned chefs</p>
        </div>
        <div className="flex items-center gap-2">
          <span>⭐</span>
          <p>Impeccable service</p>
        </div>
      </div>
    </div>
  );
}
