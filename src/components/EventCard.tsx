"use client";

import { Event } from "@/types/events";
import { Calendar, MapPin, Clock, X } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface EventCardProps {
  event: Event;
  canAccess?: boolean;
}

export default function EventCard({ event, canAccess = true }: EventCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(!!event.image_url);

  useEffect(() => {
    setImageError(false);
    setImageLoading(!event.image_url);
  }, [event.id, event.image_url]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "free":
        return "bg-gray-100 text-gray-800";
      case "silver":
        return "bg-gray-300 text-gray-800";
      case "gold":
        return "bg-yellow-200 text-yellow-800";
      case "platinum":
        return "bg-purple-200 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "free":
        return "🆓";
      case "silver":
        return "🥈";
      case "gold":
        return "🥇";
      case "platinum":
        return "💎";
      default:
        return "🎫";
    }
  };

  // Placeholder component with dynamic gradients based on tier
  const ImagePlaceholder = ({
    className,
    size = "w-20 h-20",
  }: {
    className?: string;
    size?: string;
  }) => {
    const getGradientByTier = (tier: string) => {
      switch (tier) {
        case "free":
          return "from-gray-400 via-gray-500 to-gray-600";
        case "silver":
          return "from-gray-400 via-gray-500 to-slate-600";
        case "gold":
          return "from-yellow-400 via-orange-500 to-red-500";
        case "platinum":
          return "from-purple-500 via-indigo-600 to-blue-700";
        default:
          return "from-indigo-500 via-purple-500 to-pink-500";
      }
    };

    return (
      <div
        className={`w-full h-full bg-gradient-to-br ${getGradientByTier(
          event.tier
        )} flex items-center justify-center ${className}`}
      >
        <div className="text-center">
          <Calendar className={`${size} text-white opacity-60 mx-auto mb-2`} />
          <p className="text-white text-xs opacity-50 font-medium">
            Event Image
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Event Card */}
      <div
        className={`group relative overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 cursor-pointer ${
          canAccess
            ? "bg-white border border-gray-100"
            : "bg-gray-50 border border-gray-200 opacity-80"
        }`}
        onClick={() => canAccess && setIsModalOpen(true)}
      >
        {/* Event Image */}
        <div className="relative h-52 overflow-hidden">
          {event.image_url && !imageError ? (
            <>
              {imageLoading && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                  <Calendar className="w-16 h-16 text-gray-400" />
                </div>
              )}
              <img
                src={event.image_url}
                alt={event.title}
                className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
                  imageLoading ? "opacity-0" : "opacity-100"
                }`}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            </>
          ) : (
            <ImagePlaceholder />
          )}

          {/* Tier Badge */}
          <div className="absolute top-4 left-4">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${getTierColor(
                event.tier
              )}`}
            >
              <span className="mr-1">{getTierIcon(event.tier)}</span>
              {event.tier.charAt(0).toUpperCase() + event.tier.slice(1)}
            </span>
          </div>

          {/* Date Badge */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-center shadow-sm">
            <div className="text-xs font-medium text-gray-600">
              {new Date(event.event_date).toLocaleDateString("en-US", {
                month: "short",
              })}
            </div>
            <div className="text-lg font-bold text-gray-900">
              {new Date(event.event_date).getDate()}
            </div>
          </div>

        </div>

        {/* Event Content */}
        <div className="p-6">
          <h3
            className={`text-xl font-bold mb-3 line-clamp-2 leading-tight ${
              canAccess ? "text-gray-900" : "text-gray-500"
            }`}
          >
            {event.title}
          </h3>

          {event.description && (
            <p
              className={`text-sm mb-4 line-clamp-2 leading-relaxed ${
                canAccess ? "text-gray-600" : "text-gray-400"
              }`}
            >
              {event.description}
            </p>
          )}

          {/* Event Meta Info */}
          <div className="space-y-2 mb-4">
            <div
              className={`flex items-center ${
                canAccess ? "text-gray-500" : "text-gray-400"
              }`}
            >
              <Calendar className="w-4 h-4 mr-3 flex-shrink-0" />
              <span className="text-sm font-medium">
                {formatDate(event.event_date)}
              </span>
            </div>

            <div
              className={`flex items-center ${
                canAccess ? "text-gray-500" : "text-gray-400"
              }`}
            >
              <Clock className="w-4 h-4 mr-3 flex-shrink-0" />
              <span className="text-sm">{formatTime(event.event_date)}</span>
            </div>

            {event.location && (
              <div
                className={`flex items-center ${
                  canAccess ? "text-gray-500" : "text-gray-400"
                }`}
              >
                <MapPin className="w-4 h-4 mr-3 flex-shrink-0" />
                <span className="text-sm line-clamp-1">{event.location}</span>
              </div>
            )}
          </div>

          {/* Action Button */}
          <button
            className={`w-full py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
              canAccess
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!canAccess}
            onClick={(e) => {
              e.stopPropagation();
              if (canAccess) setIsModalOpen(true);
            }}
          >
            {canAccess ? "View Event Details" : "Upgrade to Access"}
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && canAccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md overflow-y-auto">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 my-8 overflow-hidden">
            {/* Modal Header with Image */}
            <div className="relative h-64 overflow-hidden">
              {event.image_url && !imageError ? (
                <>
                  {imageLoading && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                      <Calendar className="w-20 h-20 text-gray-400" />
                    </div>
                  )}
                  <img
                    src={event.image_url}
                    alt={event.title}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      imageLoading ? "opacity-0" : "opacity-100"
                    }`}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                  />
                </>
              ) : (
                <ImagePlaceholder size="w-24 h-24" />
              )}

              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors shadow-lg"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              {/* Tier Badge */}
              <div className="absolute top-4 left-4">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold shadow-lg ${getTierColor(
                    event.tier
                  )}`}
                >
                  <span className="mr-1">{getTierIcon(event.tier)}</span>
                  {event.tier.charAt(0).toUpperCase() + event.tier.slice(1)}
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {event.title}
              </h2>

              {event.description && (
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {event.description}
                </p>
              )}

              {/* Event Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Date</p>
                      <p className="text-gray-600">
                        {formatDate(event.event_date)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Time</p>
                      <p className="text-gray-600">
                        {formatTime(event.event_date)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {event.location && (
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Location</p>
                        <p className="text-gray-600">{event.location}</p>
                      </div>
                    </div>
                  )}

                  {event.category && (
                    <div className="flex items-start">
                      <span className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0">
                        🏷️
                      </span>
                      <div>
                        <p className="font-semibold text-gray-900">Category</p>
                        <p className="text-gray-600">{event.category}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-teal-600 transition-all transform hover:scale-[1.02] shadow-md hover:shadow-lg"
                  onClick={() =>
                    toast.success(
                      "You have successfully registered for the event!"
                    )
                  }
                >
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
