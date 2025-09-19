// Mock ARGO Float Data with Enhanced Features
export const mockFloats = [
  {
    id: 'float_001',
    name: 'Float F001',
    coordinates: { lat: 35.50, lng: -65.20 },
    position: [0.2, 0.8, 0.4],
    status: 'active',
    batteryLevel: 85,
    data: {
      temperature: 18.5,
      salinity: 35.2,
      depth: 2000,
      pressure: 200.5,
      oxygen: 285.4,
      ph: 8.1,
      lastUpdate: '2024-01-15',
      status: 'Active and transmitting data',
      measurements: 1247,
      daysActive: 180
    },
    trajectory: [
      { lat: 35.45, lng: -65.15, date: '2024-01-10' },
      { lat: 35.48, lng: -65.18, date: '2024-01-12' },
      { lat: 35.50, lng: -65.20, date: '2024-01-15' }
    ]
  },
  {
    id: 'float_002', 
    name: 'Float F002',
    coordinates: { lat: -23.45, lng: 140.67 },
    position: [-0.6, -0.3, 0.7],
    status: 'active',
    batteryLevel: 92,
    data: {
      temperature: 22.1,
      salinity: 34.8,
      depth: 1500,
      pressure: 150.2,
      oxygen: 290.8,
      ph: 8.0,
      lastUpdate: '2024-01-16',
      status: 'Active and transmitting data',
      measurements: 986,
      daysActive: 145
    },
    trajectory: [
      { lat: -23.40, lng: 140.62, date: '2024-01-11' },
      { lat: -23.42, lng: 140.64, date: '2024-01-13' },
      { lat: -23.45, lng: 140.67, date: '2024-01-16' }
    ]
  },
  {
    id: 'float_003',
    name: 'Float F003', 
    coordinates: { lat: 45.32, lng: 12.89 },
    position: [0.1, 0.9, 0.2],
    status: 'active',
    batteryLevel: 78,
    data: {
      temperature: 16.3,
      salinity: 36.1,
      depth: 2500,
      pressure: 250.8,
      oxygen: 275.2,
      ph: 8.2,
      lastUpdate: '2024-01-14',
      status: 'Active and transmitting data',
      measurements: 1456,
      daysActive: 220
    },
    trajectory: [
      { lat: 45.28, lng: 12.85, date: '2024-01-09' },
      { lat: 45.30, lng: 12.87, date: '2024-01-11' },
      { lat: 45.32, lng: 12.89, date: '2024-01-14' }
    ]
  },
  {
    id: 'float_004',
    name: 'Float F004',
    coordinates: { lat: -12.67, lng: -78.45 },
    position: [-0.3, -0.2, -0.8],
    status: 'warning',
    batteryLevel: 45,
    data: {
      temperature: 24.7,
      salinity: 33.9,
      depth: 1800,
      pressure: 180.4,
      oxygen: 295.6,
      ph: 7.9,
      lastUpdate: '2024-01-17',
      status: 'Low battery - monitoring',
      measurements: 2103,
      daysActive: 340
    },
    trajectory: [
      { lat: -12.62, lng: -78.40, date: '2024-01-12' },
      { lat: -12.64, lng: -78.42, date: '2024-01-14' },
      { lat: -12.67, lng: -78.45, date: '2024-01-17' }
    ]
  },
  {
    id: 'float_005',
    name: 'Float F005',
    coordinates: { lat: 62.18, lng: -145.33 },
    position: [-0.5, 0.7, -0.4],
    status: 'active',
    batteryLevel: 95,
    data: {
      temperature: 8.2,
      salinity: 32.5,
      depth: 3000,
      pressure: 300.1,
      oxygen: 315.8,
      ph: 8.3,
      lastUpdate: '2024-01-13',
      status: 'Active and transmitting data',
      measurements: 654,
      daysActive: 95
    },
    trajectory: [
      { lat: 62.15, lng: -145.28, date: '2024-01-08' },
      { lat: 62.16, lng: -145.30, date: '2024-01-10' },
      { lat: 62.18, lng: -145.33, date: '2024-01-13' }
    ]
  },
  {
    id: 'float_006',
    name: 'Float F006',
    coordinates: { lat: -45.23, lng: 15.67 },
    position: [0.15, -0.7, 0.6],
    status: 'active',
    batteryLevel: 88,
    data: {
      temperature: 12.8,
      salinity: 34.2,
      depth: 2200,
      pressure: 220.3,
      oxygen: 298.4,
      ph: 8.0,
      lastUpdate: '2024-01-18',
      status: 'Active and transmitting data',
      measurements: 1123,
      daysActive: 165
    },
    trajectory: [
      { lat: -45.18, lng: 15.62, date: '2024-01-13' },
      { lat: -45.20, lng: 15.64, date: '2024-01-15' },
      { lat: -45.23, lng: 15.67, date: '2024-01-18' }
    ]
  }
];

// Enhanced Fun Facts with more variety
export const mockFunFacts = [
  {
    id: 1,
    icon: 'Database',
    title: 'Deep Ocean Research',
    description: 'ARGO floats dive to depths of 2000m every 10 days, collecting vital temperature and salinity data that helps us understand climate change.',
    statistic: '4,000+ Active Floats'
  },
  {
    id: 2,
    icon: 'Globe',
    title: 'Global Network',
    description: 'The ARGO array provides 100,000+ temperature and salinity profiles annually, creating the most comprehensive ocean dataset ever assembled.',
    statistic: '100,000+ Profiles/Year'
  },
  {
    id: 3,
    icon: 'Waves',
    title: 'Ocean Memory',
    description: 'The ocean holds 1000x more heat than the atmosphere and stores 50x more carbon, making it crucial for climate understanding.',
    statistic: '1000x More Heat Storage'
  },
  {
    id: 4,
    icon: 'Activity',
    title: 'Data Longevity',
    description: 'Each float completes over 150 cycles during its 4-year mission, providing continuous monitoring of ocean conditions.',
    statistic: '150+ Cycles Per Float'
  },
  {
    id: 5,
    icon: 'Thermometer',
    title: 'Temperature Precision',
    description: 'ARGO floats measure temperature with incredible precision of ±0.002°C, enabling detection of subtle climate signals.',
    statistic: '±0.002°C Precision'
  },
  {
    id: 6,
    icon: 'Droplets',
    title: 'Salinity Insights',
    description: 'Ocean salinity data reveals how evaporation, precipitation, and ice melting affect global water circulation patterns.',
    statistic: 'Global Water Cycle'
  }
];

// Mock Chat Responses with more variety
export const mockChatResponses = [
  "Based on ARGO float data, the average ocean temperature in this region is 18.5°C with a salinity of 35.2 PSU. This indicates a typical mid-latitude oceanic profile.",
  "The selected area shows interesting temperature variations with depth, indicating strong thermocline presence around 200-500m depth.",
  "ARGO floats in this region have been active for 2 years, providing consistent oceanographic measurements that show seasonal warming trends.",
  "The salinity readings suggest this area is influenced by both surface evaporation and deep water mixing, typical of subtropical gyre regions.",
  "Temperature profiles from nearby floats indicate seasonal warming trends in the upper 500m of water column, consistent with global warming patterns.",
  "Oxygen levels in this region are within normal ranges at 285-295 μmol/kg, indicating healthy ocean circulation and biological activity.",
  "The pH measurements show slightly alkaline conditions (8.0-8.2), which is typical for open ocean waters but shows signs of ocean acidification.",
  "This float has collected over 1,000 measurements during its deployment, contributing valuable data to global climate models.",
  "The trajectory data shows this float has drifted approximately 50km over the past month, following typical ocean current patterns.",
  "Battery levels are currently at 85%, indicating this float will continue operations for approximately 2-3 more years."
];

// Ocean Statistics for Dashboard
export const oceanStats = {
  totalFloats: 4247,
  activeFloats: 3984,
  dataPoints: 2850000,
  countriesInvolved: 30,
  averageDepth: 2000,
  profilesPerDay: 800,
  yearsOfData: 20,
  oceans: ['Atlantic', 'Pacific', 'Indian', 'Arctic', 'Southern']
};

// Real-time simulation data
export const simulateRealTimeData = () => {
  return {
    newMeasurements: Math.floor(Math.random() * 50) + 750,
    activeFloats: 3984 + Math.floor(Math.random() * 20) - 10,
    dataTransmissions: Math.floor(Math.random() * 100) + 200,
    timestamp: new Date().toISOString()
  };
};