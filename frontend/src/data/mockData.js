// Mock ARGO Float Data
export const mockFloats = [
  {
    id: 'float_001',
    name: 'Float F001',
    coordinates: { lat: 35.50, lng: -65.20 },
    position: [0.2, 0.8, 0.4],
    data: {
      temperature: 18.5,
      salinity: 35.2,
      depth: 2000,
      lastUpdate: '2024-01-15',
      status: 'Active and transmitting data'
    }
  },
  {
    id: 'float_002', 
    name: 'Float F002',
    coordinates: { lat: -23.45, lng: 140.67 },
    position: [-0.6, -0.3, 0.7],
    data: {
      temperature: 22.1,
      salinity: 34.8,
      depth: 1500,
      lastUpdate: '2024-01-16',
      status: 'Active and transmitting data'
    }
  },
  {
    id: 'float_003',
    name: 'Float F003', 
    coordinates: { lat: 45.32, lng: 12.89 },
    position: [0.1, 0.9, 0.2],
    data: {
      temperature: 16.3,
      salinity: 36.1,
      depth: 2500,
      lastUpdate: '2024-01-14',
      status: 'Active and transmitting data'
    }
  },
  {
    id: 'float_004',
    name: 'Float F004',
    coordinates: { lat: -12.67, lng: -78.45 },
    position: [-0.3, -0.2, -0.8],
    data: {
      temperature: 24.7,
      salinity: 33.9,
      depth: 1800,
      lastUpdate: '2024-01-17',
      status: 'Active and transmitting data'
    }
  },
  {
    id: 'float_005',
    name: 'Float F005',
    coordinates: { lat: 62.18, lng: -145.33 },
    position: [-0.5, 0.7, -0.4],
    data: {
      temperature: 8.2,
      salinity: 32.5,
      depth: 3000,
      lastUpdate: '2024-01-13',
      status: 'Active and transmitting data'
    }
  }
];

// Mock Fun Facts
export const mockFunFacts = [
  {
    id: 1,
    icon: 'Research',
    title: 'Deep Ocean Research',
    description: 'ARGO floats dive to depths of 2000m every 10 days, collecting vital temperature and salinity data.'
  },
  {
    id: 2,
    icon: 'Globe',
    title: 'Global Network',
    description: 'Over 4,000 ARGO floats are currently active across all oceans, providing real-time data.'
  },
  {
    id: 3,
    icon: 'Waves',
    title: 'Ocean Memory',
    description: 'The ocean holds 1000x more heat than the atmosphere, making it crucial for climate understanding.'
  },
  {
    id: 4,
    icon: 'Activity',
    title: 'Data Collection',
    description: 'Each float completes over 150 cycles during its 4-year mission, collecting thousands of measurements.'
  }
];

// Mock Chat Responses
export const mockChatResponses = [
  "Based on ARGO float data, the average ocean temperature in this region is 18.5°C with a salinity of 35.2 PSU.",
  "The selected area shows interesting temperature variations with depth, indicating strong thermocline presence.",
  "ARGO floats in this region have been active for 2 years, providing consistent oceanographic measurements.",
  "The salinity readings suggest this area is influenced by both surface evaporation and deep water mixing.",
  "Temperature profiles from nearby floats indicate seasonal warming trends in the upper 500m of water column."
];