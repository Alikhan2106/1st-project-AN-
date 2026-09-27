import { UDAIPUR_ATTRACTIONS } from "../data/mockData";

export const generateMockItinerary = ({ budget, days, interests }) => {
  // Filter places within interest & budget constraints
  let selected = UDAIPUR_ATTRACTIONS.filter(
    item => item.cost <= budget && item.tags.some(tag => interests.includes(tag))
  );

  if (selected.length === 0) selected = UDAIPUR_ATTRACTIONS;

  return selected.map((place, index) => {
    const isOvercrowded = place.crowdLevel > 75;
    const alternative = isOvercrowded 
      ? UDAIPUR_ATTRACTIONS.find(a => a.id === place.alternativeId) 
      : null;

    return {
      slot: index === 0 ? "9:00 AM" : index === 1 ? "1:00 PM" : "4:00 PM",
      place,
      isOvercrowded,
      alternativeSuggested: alternative
    };
  });
};