const ranksSelect = [
  {
    label: 'DECK',
    options: [
      'Master',
      'Chief Officer',
      'Single Officer',
      '2nd Officer',
      '3rd Officer',
      'Senior DPO',
      'Junior DPO',
      'DPO',
      'Trainee Officer',
      'Bosun (Boatswain)',
      'AB (Able Seaman)',
      'AB/Welder',
      'OS (Ordinary Seaman)',
      'Deck Cadet',
      'Cadet/Trainee',
      'Chief Cook',
      'Cook',
      '2nd Cook',
      'Messboy',
      'AB/Cook',
      'Crane Operator',
      'Dredge Master',
      'Diver',
    ],
  },
  {
    label: 'ENGINE',
    options: [
      'Chief Engineer',
      'Single Engineer',
      '2nd Engineer',
      '3rd Engineer',
      '4th Engineer',
      'Watch Engineer',
      'Ref. Engineer',
      'Gas Engineer',
      'Trainee Engineer',
      'Electrical Engineer',
      'ETO',
      'Electrician',
      'Assistant Electrical Engineer',
      'Motorman/Oiler',
      'Wiper',
      'Motorman/Electrician',
      'AB/MM',
      'Engine Cadet',
      'Fitter/Welder',
      'Turner',
      'Pumpman',
      'Superintendent',
    ],
  },
  {
    label: 'OTHER',
    options: [
      'Administrative Assistant',
      'Art Auctioneer',
      'Assistant Cruise Director',
      'Assistant Shore Excursions Manager',
      'Audio Visual Coordinator',
      'AV/IT',
      'Baker',
      'Bar Steward',
      'Beautician',
      'Beauty Therapist',
      'Bedroom Steward',
      'Booking Agent',
      'Bookkeeper',
      'Brand Manager',
      'Buffet Server',
      'Butcher',
      'Cabin Stewardess',
      'CETO',
      'Chef de Partie',
      'Chief Cabin Steward',
      'Chief Purser',
      'Chief Steward/Housekeeper',
      'Chief Stewardess',
      'Cocktail Server',
      'Computer Systems Manager/IT',
      'Cosmetologist',
      'Cruise Consultant',
      'Customer Service Representative',
      'Dancer',
      'Dance Instructor',
      'Deck Hand',
      'Dining Room Head Waiter',
      'Dining Room Manager',
      'Disc Jockey',
      'Dive Instructor',
      'Entertainer',
      'Expedition Leader',
      'Field Representative',
      'Fitness Director',
      'Fitness Instructor',
      'Galley Stewardess',
      'General Cook',
      'Gentlemen Host',
      'Gift Shop Manager',
      'Gift Shop Sales Assistant',
      'Hair Stylist',
      'Housekeeper, Assistant',
      'Housekeeper, Chief',
      'HR Manager',
      'Inside Sales Representative',
      'IT Lead Developer',
      'IT Staff',
      'Laundry Helper',
      'Laundry Keeper',
      'Laundry Supervisor',
      'Lead Deckhand',
      'Lecturer/ Special Guest Speaker',
      'Lifeguard',
      "Maitre d' Hotel",
      'Manicurist',
      'Marketing / PR',
      'Marketing Research Analyst',
      'Massage Therapist',
      'Naturalist',
      'Nurse/Stewardess',
      'Operations Administrator',
      'Operations Analyst',
      'Outside Sales Representative',
      'Payroll Clerk',
      'Personal Trainer',
      'Production Manager',
      'Program Coordinator',
      'Purchasing Agent',
      'Quarter Master',
      'Safety Officer',
      'Senior Business Analyst',
      'Senior Housekeeper',
      'Senior Staff Accountant',
      'Senior Stewardess',
      'Shore Excursions Manager',
      'Social Host/Hostess',
      'Software Engineer',
      'Sound and Light Technician',
      'Spa Attendant',
      'Spa Stewardess',
      'Staff Accountant',
      'Staff Captain',
      'Tour Accounting',
      'Water Sports Instructor',
      'Worker of the product-plant',
      'Contracts Administrator',
      'Contracts Manager',
      'Chartering Manager',
      'Systems Engineer',
      'Naval Architect',
      'Sales Manager',
      'Business Development Manager',
      'Superintendent Electrical',
      'Trader',
      'Analyst',
      'Port Manager',
      'Engineering Manager',
      'Maintenance Technician',
      'CAD Operator',
      'SG1A',
      'Service Manager',
      'Technical Manager',
      'Underwriter',
      'Head of Network Planning',
      'Network Planning Manager',
      'Marine Surveyor',
      'Marine Consultant',
      'Buyer',
      'Terminal Manager',
      'Superintendent Technical',
      'IT Manager',
      'Technical Assistant',
      'Operations Manager',
      'Ship Planner',
      'Marine Manager',
      'Associate',
      'Ship Operator',
      'Crewing Manager',
      'Service Engineer',
      'Controls Engineer',
      'Account Executive',
      'Claims Executive',
      'Risk Advisor',
      'Account Manager',
      'Commercial Manager',
      'Human Resources',
      'Welding Engineer',
      'Export Clerk',
      'Project Manager',
      'Vetting Superintendent',
      'Procurement Officer',
      'Superintendent Operations',
      'Operations Assistant',
      'Operations Executive',
      'Logistics Executive',
      'Quality Manager',
      'Marine Engineer',
      'Operations Officer',
      'Sales Engineer',
      'Cargo Engineer',
      'Technical Director',
      'Procurement Manager',
      'Customer Service Executive',
      'Bunker Purchaser',
      'Project Engineer',
      'Bunker Trader',
      'Recruitment Consultant',
      'Structural Engineer',
      'Project Officer',
      'Port Engineer',
      'Client Representative',
      'Ships Agent',
      'Port Agent',
      'Charterer',
      'Superintendent Cargo',
      'Crewing Officer',
      'Operations Director',
      'Assistant HSE Superintendent',
      'Environmental Manager',
      'Marketing Executive',
      'Port Captain',
      'Broker',
      'HSE Manager',
      'Surveyor',
      'Administration Manager',
      'Roustabout',
      'Derrickman',
      'Floor man',
      'Pipefitter',
      'Fabricator',
      'Coxswain',
      'Repair Engineer',
      'Slot Technician',
      'Hydrographic surveyor',
      'Hydro-acoustic operator',
      'General Manager',
      'Chief trawl-master',
      'Hotel Manager',
      'Watch trawl-master',
      'Casino Manager',
      'Seaman-winchman',
      'Shop Manager',
      'Trawl seaman',
      'Provision Master',
      'Master of the product',
      'Store Manager',
      'Fish-master',
      'Purser',
      'Workers of the product-plant',
      'Accountant',
      'Engineer-adjuster',
      'Cruise Director',
      'Fishmill operator',
      'Hotel, Manager - Director',
      'Refrigerator operator',
      'Hotel, Manager Secretary',
      'Laundry operator',
      'Receptionist',
      'Storekeeper',
      'Cashier',
      'Photographer',
      'Security Officer',
      'Security Guard',
      'Housekeeper, Chief',
      'Housekeeper, Assistant',
      'Steward, Head Room',
      'Steward / Stewardess, Cabin',
      'Steward / Stewardess, Assistant Cabin',
      'Bell Captain',
      'Bell Boy',
      'Cleaner',
      'Laundry, Supervisor',
      'Laundry, Keeper',
      'Laundry, Man',
      'Laundry, Helper',
      'Linen Keeper',
      'Chambermaid',
      'Pool Attendant',
      'Food & Beverage Manager',
      'Food & Beverage Assistant Manager',
      'Bar Manager',
      'Bar Assistant Manager',
      'Bartender',
      'Bar Waiter',
      'Head Waiter',
      'Waiter / Waitress',
      'Wine Steward',
      'Busboy',
      'Plumber',
      'Upholsterer',
      'Tailor',
      'Carpenter',
      'AC Repairman',
      'General Purpose Repairman',
      'Stewardess',
      'Staff Engineer',
      'Hotel Accommodation Engineer',
      'Radio Officer',
      'Personal Assistant (secretary)',
      'Administration support',
      'Personal Assistant (secretary)',
      'Administration support',
      'Injection Molding machine operator',
      'Junior mechanical engineer',
      'Spring machine operator',
      'lathe machine operator',
      'Commissioning Engineer',
      'Pipe Operator',
      'Doctor',
      'Communication Officer',
    ],
  },
];

export default ranksSelect;
