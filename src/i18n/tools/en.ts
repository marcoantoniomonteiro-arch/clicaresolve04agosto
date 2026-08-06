// English SEO + content data for universal tools
// Each entry: ptSlug maps to the original Portuguese slug (for cross-reference)
// enSlug is the new English URL slug
// Structure matches toolSeoData.ts pattern (title, description, h1, intro, faqs)
export interface ToolSeoEN {
  ptSlug: string;
  enSlug: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  faqs: { question: string; answer: string }[];
}
export const toolsSeoEN: ToolSeoEN[] = [
  {
    ptSlug: "imc-avancada",
    enSlug: "bmi-calculator",
    title: "BMI Calculator — Free Body Mass Index Tool",
    metaDescription: "Calculate your BMI (Body Mass Index) instantly and free. Find out if your weight is in a healthy range based on your height and weight.",
    h1: "BMI Calculator",
    intro: "Body Mass Index (BMI) is a quick way to estimate whether your weight is appropriate for your height. Enter your weight and height below to get your BMI and see which category it falls into.",
    faqs: [
      { question: "What is a healthy BMI range?", answer: "For most adults, a BMI between 18.5 and 24.9 is considered a healthy weight range." },
      { question: "Is BMI accurate for everyone?", answer: "BMI is a useful screening tool but doesn't account for muscle mass, bone density, or body composition, so it may not be accurate for athletes or older adults." }
    ]
  },
  {
    ptSlug: "juros-compostos",
    enSlug: "compound-interest",
    title: "Compound Interest Calculator — Free Investment Growth Tool",
    metaDescription: "Calculate how your investment grows over time with compound interest. Free calculator with monthly contributions and annual rate.",
    h1: "Compound Interest Calculator",
    intro: "Compound interest is when your investment earns interest not only on the principal but also on the interest already accumulated. Use this calculator to project how your savings could grow over time.",
    faqs: [
      { question: "What's the difference between simple and compound interest?", answer: "Simple interest is calculated only on the original amount, while compound interest is calculated on the original amount plus any interest already earned." },
      { question: "How often is interest compounded?", answer: "It depends on the investment. Common compounding periods are daily, monthly, or annually." }
    ]
  },
  {
    ptSlug: "pomodoro",
    enSlug: "pomodoro-timer",
    title: "Pomodoro Timer — Free Online Focus Timer",
    metaDescription: "Free Pomodoro timer to boost your focus and productivity. Work in 25-minute intervals with short breaks.",
    h1: "Pomodoro Timer",
    intro: "The Pomodoro Technique breaks work into focused 25-minute intervals separated by short breaks, helping you stay concentrated and avoid burnout.",
    faqs: [
      { question: "How long is a Pomodoro session?", answer: "Traditionally, a Pomodoro session is 25 minutes of focused work, followed by a 5-minute break." },
      { question: "How many Pomodoros should I do per day?", answer: "It varies by person, but 4-8 Pomodoro sessions per day is a common target for deep work." }
    ]
  },
  {
    ptSlug: "gerador-senhas",
    enSlug: "password-generator",
    title: "Password Generator — Free Secure Random Password Tool",
    metaDescription: "Generate strong, random passwords for free. Customize length and character types for maximum security.",
    h1: "Password Generator",
    intro: "Create strong, random passwords to protect your accounts. Customize the length and which character types to include.",
    faqs: [
      { question: "How long should a secure password be?", answer: "Security experts recommend at least 12-16 characters, combining uppercase, lowercase, numbers, and symbols." },
      { question: "Are generated passwords stored anywhere?", answer: "No, passwords are generated entirely in your browser and are never sent to or stored on any server." }
    ]
  },
  {
    ptSlug: "gerador-qrcode",
    enSlug: "qr-code-generator",
    title: "QR Code Generator — Free Online QR Code Maker",
    metaDescription: "Create free QR codes instantly for links, text, or contact info. No sign-up required, download in seconds.",
    h1: "QR Code Generator",
    intro: "Turn any link, text, or piece of information into a scannable QR code, ready to download and use.",
    faqs: [
      { question: "Do QR codes generated here expire?", answer: "No, the QR code image itself never expires — it will always point to the content you entered." },
      { question: "Can I customize the QR code design?", answer: "This tool focuses on fast, clean QR codes. Basic customization options may be available depending on the version." }
    ]
  },
  {
    ptSlug: "diferenca-datas",
    enSlug: "date-difference",
    title: "Date Difference Calculator — Days Between Two Dates",
    metaDescription: "Calculate the exact number of days, months, and years between two dates for free.",
    h1: "Date Difference Calculator",
    intro: "Find out exactly how much time has passed (or will pass) between two dates, in days, weeks, months, and years.",
    faqs: [
      { question: "Does this include the start and end date?", answer: "The calculator counts the full days between the two dates you enter." },
      { question: "Can I calculate future dates?", answer: "Yes, you can calculate the difference between any two dates, past or future." }
    ]
  },
  {
    ptSlug: "dias-vida",
    enSlug: "days-alive",
    title: "Days Alive Calculator — How Many Days Have You Lived?",
    metaDescription: "Find out exactly how many days, weeks, and months you've been alive, for free.",
    h1: "Days Alive Calculator",
    intro: "Enter your birth date to discover exactly how many days you've been alive — a fun way to look at your life in numbers.",
    faqs: [
      { question: "Does this account for leap years?", answer: "Yes, the calculation accounts for leap years automatically." }
    ]
  },
  {
    ptSlug: "macronutrientes",
    enSlug: "macronutrient-calculator",
    title: "Macronutrient Calculator — Free Macros Calculator",
    metaDescription: "Calculate your ideal daily macronutrients (protein, carbs, fat) based on your goals, weight, and activity level.",
    h1: "Macronutrient Calculator",
    intro: "Find out how many grams of protein, carbohydrates, and fat you should eat daily based on your body and goals.",
    faqs: [
      { question: "What are macronutrients?", answer: "Macronutrients are the three main nutrients your body needs in large amounts: protein, carbohydrates, and fat." },
      { question: "Should I follow these numbers exactly?", answer: "These are general estimates. For specific medical or athletic goals, consult a nutritionist." }
    ]
  },
  {
    ptSlug: "frequencia-cardiaca",
    enSlug: "heart-rate-calculator",
    title: "Heart Rate Zone Calculator — Free Training Zones Tool",
    metaDescription: "Calculate your maximum heart rate and training zones for free, based on your age.",
    h1: "Heart Rate Zone Calculator",
    intro: "Find your estimated maximum heart rate and the ideal training zones for fat burning, cardio, and peak performance.",
    faqs: [
      { question: "How is maximum heart rate calculated?", answer: "A common formula is 220 minus your age, though individual variation exists." }
    ]
  },
  {
    ptSlug: "ciclos-sono",
    enSlug: "sleep-cycle-calculator",
    title: "Sleep Cycle Calculator — Best Time to Sleep or Wake Up",
    metaDescription: "Find the best time to go to sleep or wake up based on 90-minute sleep cycles, for free.",
    h1: "Sleep Cycle Calculator",
    intro: "Sleep happens in cycles of roughly 90 minutes. Waking up between cycles (not in the middle of one) can help you feel more rested.",
    faqs: [
      { question: "How long is one sleep cycle?", answer: "A full sleep cycle typically lasts about 90 minutes." }
    ]
  },
  {
    ptSlug: "limite-cafeina",
    enSlug: "caffeine-limit",
    title: "Caffeine Limit Calculator — Daily Safe Caffeine Intake",
    metaDescription: "Find your recommended daily caffeine limit and track how much you've consumed, for free.",
    h1: "Caffeine Limit Calculator",
    intro: "Estimate a safe daily caffeine limit based on general health guidelines, and see how your coffee, tea, or energy drinks add up.",
    faqs: [
      { question: "How much caffeine is considered safe per day?", answer: "For most healthy adults, up to 400mg per day (about 4 cups of coffee) is generally considered safe." }
    ]
  },
  {
    ptSlug: "gasto-calorico",
    enSlug: "calorie-burn-calculator",
    title: "Calorie Burn Calculator — Free Daily Calorie Needs Tool",
    metaDescription: "Calculate how many calories you burn per day based on your activity level, weight, height, and age.",
    h1: "Calorie Burn Calculator",
    intro: "Estimate your total daily energy expenditure (TDEE) — the number of calories your body burns per day, including activity.",
    faqs: [
      { question: "What is TDEE?", answer: "TDEE (Total Daily Energy Expenditure) is the total number of calories you burn in a day, including exercise and daily activity." }
    ]
  },
  {
    ptSlug: "periodo-fertil",
    enSlug: "fertility-calculator",
    title: "Fertility Calculator — Free Ovulation & Fertile Window Tool",
    metaDescription: "Calculate your fertile window and estimated ovulation date for free, based on your menstrual cycle.",
    h1: "Fertility Calculator",
    intro: "Estimate your fertile window and most likely ovulation day based on your average menstrual cycle length.",
    faqs: [
      { question: "How accurate is this calculator?", answer: "This provides an estimate based on average cycles. Actual ovulation can vary and this is not a substitute for medical advice." }
    ]
  },
  {
    ptSlug: "conversor-moedas",
    enSlug: "currency-converter",
    title: "Currency Converter — Real-Time Exchange Rates",
    metaDescription: "Convert between currencies instantly with live exchange rates. Free currency conversion tool.",
    h1: "Currency Converter",
    intro: "Quickly convert between different currencies using current exchange rates.",
    faqs: [
      { question: "Are the exchange rates real-time?", answer: "Our converter uses updated exchange rate data for accurate conversions. Rates can fluctuate throughout the day." }
    ]
  },
  {
    ptSlug: "calculadora-btu",
    enSlug: "btu-calculator",
    title: "BTU Calculator — Find the Right AC Size for Your Room",
    metaDescription: "Calculate the ideal BTU capacity for air conditioners based on room size. Free AC sizing tool.",
    h1: "BTU Calculator",
    intro: "Find out how many BTUs your air conditioner needs based on your room's size and conditions.",
    faqs: [
      { question: "What is a BTU?", answer: "BTU (British Thermal Unit) measures an air conditioner's cooling capacity. The right BTU rating ensures efficient cooling without wasting energy." }
    ]
  },
  {
    ptSlug: "simulador-markup",
    enSlug: "markup-simulator",
    title: "Markup Simulator — Calculate Sale Price & Profit Margin",
    metaDescription: "Simulate product markup, profit margin, and final sale price. Free tool for small business owners.",
    h1: "Markup Simulator",
    intro: "Calculate the ideal sale price for your products based on cost, desired markup, and profit margin.",
    faqs: [
      { question: "What's the difference between markup and margin?", answer: "Markup is the percentage added to cost to set the price, while margin is the percentage of the final price that represents profit. They use different formulas." }
    ]
  },
  {
    ptSlug: "ponto-equilibrio",
    enSlug: "break-even-calculator",
    title: "Break-Even Point Calculator — Find Your Business Break-Even",
    metaDescription: "Calculate your business's break-even point based on fixed costs, variable costs, and price. Free tool.",
    h1: "Break-Even Point Calculator",
    intro: "Find out how many units you need to sell to cover your costs and start turning a profit.",
    faqs: [
      { question: "How do I calculate the break-even point?", answer: "Divide your fixed costs by the difference between your sale price and variable cost per unit. This tells you how many units you need to sell to break even." }
    ]
  },
  {
    ptSlug: "contracoes",
    enSlug: "contraction-timer",
    title: "Contraction Timer — Track Labor Contractions Free",
    metaDescription: "Time and track labor contractions to know when it's time to head to the hospital. Free contraction tracker.",
    h1: "Contraction Timer",
    intro: "Track the duration and frequency of contractions to help determine labor progress.",
    faqs: [
      { question: "When should I start timing contractions?", answer: "Start timing when contractions become regular and noticeable. Track both duration and the time between contractions to spot patterns." }
    ]
  },
  {
    ptSlug: "contador-caracteres",
    enSlug: "character-counter",
    title: "Character Counter — Count Characters & Words Free",
    metaDescription: "Count characters, words, and sentences in your text instantly. Free online character counter.",
    h1: "Character Counter",
    intro: "Count characters, words, and sentences in real time. Perfect for social media posts, essays, and SEO.",
    faqs: [
      { question: "Why do I need a character counter?", answer: "Character counters help you stay within limits for social media posts, meta descriptions, headlines, and other text with strict length requirements." }
    ]
  },
  {
    ptSlug: "mapeamento-erros",
    enSlug: "error-log-tracker",
    title: "Error Log Tracker — Organize & Track Bugs Free",
    metaDescription: "Track and organize errors, bugs, and issues in your projects. Free error tracking tool.",
    h1: "Error Log Tracker",
    intro: "Keep track of errors and bugs found in your projects, organized by priority and status.",
    faqs: [
      { question: "Why should I track errors systematically?", answer: "Tracking errors helps you prioritize fixes, avoid duplicate work, and maintain a clear history of issues resolved over time." }
    ]
  },
  {
    ptSlug: "metros-quadrados",
    enSlug: "square-footage-calculator",
    title: "Square Footage Calculator — Calculate Area Instantly",
    metaDescription: "Calculate square footage or square meters of any room or space. Free area calculator.",
    h1: "Square Footage Calculator",
    intro: "Calculate the area of any room or space by entering its dimensions.",
    faqs: [
      { question: "How do I calculate square footage?", answer: "Multiply the length by the width of the space. For irregular shapes, divide the area into rectangles and add the results together." }
    ]
  },
  {
    ptSlug: "calculadora-tinta",
    enSlug: "paint-calculator",
    title: "Paint Calculator — Estimate How Much Paint You Need",
    metaDescription: "Calculate how much paint you need for your walls based on area and number of coats. Free tool.",
    h1: "Paint Calculator",
    intro: "Find out exactly how much paint you need based on the size of your walls and number of coats.",
    faqs: [
      { question: "How much paint do I need per square meter?", answer: "On average, one liter of paint covers about 10 square meters per coat, but this varies by paint type and surface." }
    ]
  },
  {
    ptSlug: "consumo-energia",
    enSlug: "energy-consumption-calculator",
    title: "Energy Consumption Calculator — Estimate Your Electric Bill",
    metaDescription: "Calculate the energy consumption and cost of your home appliances. Free electricity cost tool.",
    h1: "Energy Consumption Calculator",
    intro: "Estimate how much energy your appliances use and what it costs on your electricity bill.",
    faqs: [
      { question: "How is energy consumption calculated?", answer: "Multiply the appliance's wattage by hours used, then by your electricity rate. Our calculator does this automatically." }
    ]
  },
  {
    ptSlug: "alerta-agua",
    enSlug: "water-intake-reminder",
    title: "Water Intake Reminder — Track Your Daily Hydration",
    metaDescription: "Calculate your ideal daily water intake and get reminders to stay hydrated. Free hydration tracker.",
    h1: "Water Intake Reminder",
    intro: "Find your ideal daily water intake based on your weight and activity level, and track your progress.",
    faqs: [
      { question: "How much water should I drink daily?", answer: "A common guideline is 35ml per kg of body weight, though needs vary based on activity level, climate, and health." }
    ]
  },
  {
    ptSlug: "limpeza-zonas",
    enSlug: "cleaning-schedule-planner",
    title: "Cleaning Schedule Planner — Organize Home Cleaning by Zones",
    metaDescription: "Create a cleaning schedule organized by zones or rooms. Free home cleaning planner tool.",
    h1: "Cleaning Schedule Planner",
    intro: "Organize your home cleaning tasks by zones or rooms, spreading them across the week for easier management.",
    faqs: [
      { question: "What is zone cleaning?", answer: "Zone cleaning divides your home into sections and assigns specific cleaning tasks to each day, making the workload more manageable than cleaning everything at once." }
    ]
  },
  {
    ptSlug: "conversor-cozinha",
    enSlug: "kitchen-measurement-converter",
    title: "Kitchen Measurement Converter — Cups, Grams & More",
    metaDescription: "Convert cooking measurements between cups, grams, ounces, and more. Free kitchen conversion tool.",
    h1: "Kitchen Measurement Converter",
    intro: "Convert between cups, grams, ounces, tablespoons, and other cooking measurements instantly.",
    faqs: [
      { question: "How many grams are in a cup?", answer: "It depends on the ingredient — a cup of flour is about 120g, while a cup of sugar is about 200g, since density varies by ingredient." }
    ]
  },
  {
    ptSlug: "conversor-roupas",
    enSlug: "clothing-size-converter",
    title: "Clothing Size Converter — US, UK & EU Sizes",
    metaDescription: "Convert clothing sizes between US, UK, EU, and other international sizing systems. Free size converter.",
    h1: "Clothing Size Converter",
    intro: "Convert clothing and shoe sizes between different countries' sizing systems.",
    faqs: [
      { question: "Why do clothing sizes vary by country?", answer: "Different countries use different measurement standards and body-shape assumptions, which is why the same garment can have different size numbers depending on the region." }
    ]
  },
  {
    ptSlug: "roteirizador",
    enSlug: "trip-route-planner",
    title: "Trip Route Planner — Plan Your Travel Itinerary",
    metaDescription: "Plan your trip route and itinerary with stops and estimated times. Free travel planning tool.",
    h1: "Trip Route Planner",
    intro: "Organize your trip itinerary with stops, distances, and estimated travel times.",
    faqs: [
      { question: "How do I plan an efficient travel route?", answer: "Group nearby stops together, account for travel time between each, and build in buffer time for unexpected delays." }
    ]
  },
  {
    ptSlug: "onde-assistir",
    enSlug: "where-to-watch-finder",
    title: "Where to Watch Finder — Find Movies & Shows by Streaming Service",
    metaDescription: "Find which streaming service has the movie or show you want to watch. Free streaming search tool.",
    h1: "Where to Watch Finder",
    intro: "Search for a movie or TV show and find out which streaming platforms have it available.",
    faqs: [
      { question: "Why can't I find a title on my streaming service?", answer: "Streaming availability varies by region and changes frequently due to licensing agreements between studios and platforms." }
    ]
  },
  {
    ptSlug: "gerador-bolao",
    enSlug: "office-pool-generator",
    title: "Office Pool Generator — Organize Sports Betting Pools",
    metaDescription: "Create and manage office pools for sports tournaments. Free pool organizer tool.",
    h1: "Office Pool Generator",
    intro: "Organize a sports betting pool among friends or coworkers, tracking picks and results.",
    faqs: [
      { question: "How does an office pool work?", answer: "Participants predict outcomes of games or tournaments, and points are awarded based on accuracy. Whoever scores the most points wins." }
    ]
  },
  {
    ptSlug: "probabilidades-classificacao",
    enSlug: "playoff-probability-calculator",
    title: "Playoff Probability Calculator — Estimate Team Qualification Chances",
    metaDescription: "Calculate the probability of a team qualifying for playoffs based on standings. Free sports stats tool.",
    h1: "Playoff Probability Calculator",
    intro: "Estimate a team's chances of qualifying for playoffs based on current standings and remaining games.",
    faqs: [
      { question: "How are qualification probabilities calculated?", answer: "These calculations typically simulate remaining games thousands of times based on team strength, then measure how often a team qualifies across all simulations." }
    ]
  },
  {
    ptSlug: "palpites-loteria",
    enSlug: "lottery-number-generator",
    title: "Lottery Number Generator — Random Number Picker",
    metaDescription: "Generate random lottery number combinations. Free lottery number picker tool.",
    h1: "Lottery Number Generator",
    intro: "Generate random number combinations for lottery games of your choice.",
    faqs: [
      { question: "Does a random generator improve my odds?", answer: "No — lottery draws are random, so no method improves your odds of winning. A generator simply saves you the effort of picking numbers manually." }
    ]
  },
  {
    ptSlug: "sorteador-equipes",
    enSlug: "team-randomizer",
    title: "Team Randomizer — Split Groups Into Random Teams",
    metaDescription: "Randomly split a list of people into balanced teams. Free team generator tool.",
    h1: "Team Randomizer",
    intro: "Randomly divide a list of names into a set number of teams for games, sports, or group activities.",
    faqs: [
      { question: "Can I control team size?", answer: "Yes, you can set the number of teams or the number of people per team, and the tool will distribute names as evenly as possible." }
    ]
  },
  {
    ptSlug: "placar-poliesportivo",
    enSlug: "multi-sport-scoreboard",
    title: "Multi-Sport Scoreboard — Free Digital Scorekeeper",
    metaDescription: "Digital scoreboard for any sport — track points, sets, and time. Free online scorekeeper.",
    h1: "Multi-Sport Scoreboard",
    intro: "A flexible digital scoreboard that works for any sport — track points, sets, fouls, and time.",
    faqs: [
      { question: "What sports can I use this scoreboard for?", answer: "It works for virtually any sport with a score, including basketball, volleyball, tennis, soccer, and casual games." }
    ]
  },
  {
    ptSlug: "painel-bingo",
    enSlug: "bingo-caller",
    title: "Bingo Caller — Free Online Bingo Number Generator",
    metaDescription: "Call random bingo numbers with this free online bingo generator. Perfect for game nights.",
    h1: "Bingo Caller",
    intro: "Draw random bingo numbers for your game night, with each number tracked so none repeat.",
    faqs: [
      { question: "How many numbers are in a standard bingo game?", answer: "Standard bingo uses numbers 1 through 75, though variations like 90-ball bingo exist in different regions." }
    ]
  },
  {
    ptSlug: "dpp",
    enSlug: "due-date-calculator",
    title: "Due Date Calculator — Estimate Your Baby's Arrival",
    metaDescription: "Calculate your estimated due date based on your last period or conception date. Free pregnancy tool.",
    h1: "Due Date Calculator",
    intro: "Estimate your baby's due date based on your last menstrual period or conception date.",
    faqs: [
      { question: "How accurate is a due date calculation?", answer: "Due dates are estimates — only about 5% of babies are born on their exact due date. Most arrive within two weeks before or after." }
    ]
  },
  {
    ptSlug: "salario-hora",
    enSlug: "hourly-wage-calculator",
    title: "Hourly Wage Calculator — Convert Salary to Hourly Rate",
    metaDescription: "Calculate your hourly wage from monthly or annual salary, or the reverse. Free wage conversion tool.",
    h1: "Hourly Wage Calculator",
    intro: "Convert your monthly or annual salary into an hourly rate, or find out how much you earn per hour based on hours worked.",
    faqs: [
      { question: "How do I convert salary to hourly rate?", answer: "Divide your monthly salary by the number of hours worked per month. Our calculator does this instantly based on your work schedule." }
    ]
  },
  {
    ptSlug: "taxas-maquininha",
    enSlug: "card-machine-fees-calculator",
    title: "Card Machine Fees Calculator — Know Your Real Payout",
    metaDescription: "Calculate how much you actually receive after card machine fees and taxes. Free tool for merchants.",
    h1: "Card Machine Fees Calculator",
    intro: "Find out exactly how much you'll receive after card processing fees are deducted from a sale.",
    faqs: [
      { question: "Why do card machines charge fees?", answer: "Card machines charge fees to cover payment processing costs, which vary by payment type (debit, credit, installments) and provider." }
    ]
  },
  {
    ptSlug: "parcelamento-multas",
    enSlug: "fine-installment-calculator",
    title: "Fine Installment Calculator — Split Traffic Fines Into Payments",
    metaDescription: "Calculate installment payments for traffic fines and other penalties. Free installment planning tool.",
    h1: "Fine Installment Calculator",
    intro: "Calculate how much you'd pay per month if you split a fine or penalty into installments.",
    faqs: [
      { question: "Can traffic fines be paid in installments?", answer: "In many places, yes — fines above a certain value can often be split into monthly installments, sometimes with added interest." }
    ]
  },
  {
    ptSlug: "depreciacao-veiculo",
    enSlug: "vehicle-depreciation-calculator",
    title: "Vehicle Depreciation Calculator — Estimate Resale Value",
    metaDescription: "Calculate how much your vehicle will depreciate over time. Free car value estimator tool.",
    h1: "Vehicle Depreciation Calculator",
    intro: "Estimate how much your vehicle's value will decrease over the coming years based on age and depreciation rate.",
    faqs: [
      { question: "How fast do cars depreciate?", answer: "Cars typically lose 15-20% of their value in the first year and continue depreciating 10-15% annually afterward, though rates vary by make and model." }
    ]
  },
  {
    ptSlug: "comparador-preco",
    enSlug: "price-comparison-calculator",
    title: "Price Comparison Calculator — Find the Best Unit Price",
    metaDescription: "Compare prices between different package sizes to find the best value per unit. Free shopping tool.",
    h1: "Price Comparison Calculator",
    intro: "Compare products with different sizes or quantities to find which one offers the best price per unit.",
    faqs: [
      { question: "How do I compare prices between different sizes?", answer: "Divide the total price by the quantity (weight, volume, or units) to get the price per unit, then compare across products." }
    ]
  },
  {
    ptSlug: "divisor-carona",
    enSlug: "ride-cost-splitter",
    title: "Ride Cost Splitter — Split Trip Expenses Fairly",
    metaDescription: "Split the cost of a shared ride or trip fairly among passengers. Free cost-sharing calculator.",
    h1: "Ride Cost Splitter",
    intro: "Calculate how to fairly split gas, tolls, and other trip expenses among everyone sharing the ride.",
    faqs: [
      { question: "How do I split ride costs fairly?", answer: "Add up all trip expenses (fuel, tolls, parking) and divide by the number of people sharing the ride, or adjust based on distance traveled by each." }
    ]
  },
  {
    ptSlug: "ciclo-estudos",
    enSlug: "study-cycle-planner",
    title: "Study Cycle Planner — Organize Your Study Sessions",
    metaDescription: "Plan and organize study cycles across subjects for more effective learning. Free study planner tool.",
    h1: "Study Cycle Planner",
    intro: "Organize your study time across different subjects in balanced cycles for more effective learning.",
    faqs: [
      { question: "What is a study cycle?", answer: "A study cycle is a method of rotating through different subjects in planned intervals, helping maintain focus and balanced coverage of all topics." }
    ]
  },
  {
    ptSlug: "velocidade-digitacao",
    enSlug: "typing-speed-test",
    title: "Typing Speed Test — Measure Your WPM Free",
    metaDescription: "Test your typing speed and accuracy in words per minute (WPM). Free online typing test.",
    h1: "Typing Speed Test",
    intro: "Measure how fast and accurately you type with this free online typing speed test.",
    faqs: [
      { question: "What is a good typing speed?", answer: "Average typing speed is around 40 WPM, while professional typists often reach 65-75 WPM or higher." }
    ]
  },
  {
    ptSlug: "taxa-engajamento",
    enSlug: "engagement-rate-calculator",
    title: "Engagement Rate Calculator — Measure Social Media Performance",
    metaDescription: "Calculate your social media engagement rate based on likes, comments, and followers. Free tool.",
    h1: "Engagement Rate Calculator",
    intro: "Calculate your engagement rate on social media based on likes, comments, shares, and total followers or reach.",
    faqs: [
      { question: "How is engagement rate calculated?", answer: "Divide total interactions (likes, comments, shares) by your follower count or reach, then multiply by 100 to get a percentage." }
    ]
  },
  {
    ptSlug: "calculadora-desconto",
    enSlug: "discount-percentage-calculator",
    title: "Discount Calculator — Calculate Sale Prices & Savings",
    metaDescription: "Calculate discounts, sale prices, and how much you're saving. Free discount calculator tool.",
    h1: "Discount Calculator",
    intro: "Quickly calculate the final price after a discount, or find out how much you're saving on a purchase.",
    faqs: [
      { question: "How do I calculate a discount percentage?", answer: "Multiply the original price by the discount percentage in decimal form, then subtract that from the original price." }
    ]
  },
  {
    ptSlug: "formatador-legendas",
    enSlug: "subtitle-formatter",
    title: "Subtitle Formatter — Clean & Format SRT/VTT Files",
    metaDescription: "Format and clean up subtitle files for videos. Free subtitle formatting tool.",
    h1: "Subtitle Formatter",
    intro: "Clean up and reformat subtitle text for your videos, fixing timing and line breaks.",
    faqs: [
      { question: "What subtitle formats are supported?", answer: "Most tools work with common formats like SRT and VTT, which are widely used across video platforms." }
    ]
  },
  {
    ptSlug: "roteiro-judaismo",
    enSlug: "judaism-study-guide",
    title: "Judaism Study Guide — Organize Your Torah Learning",
    metaDescription: "Create a structured study plan for learning about Judaism and Torah topics. Free study guide tool.",
    h1: "Judaism Study Guide",
    intro: "Build a structured plan for studying Torah and Jewish tradition topics at your own pace.",
    faqs: [
      { question: "How do I structure a Torah study plan?", answer: "Break topics into manageable sections, set a regular schedule, and progress systematically through key texts and concepts." }
    ]
  },
  {
    ptSlug: "plano-leitura-biblica",
    enSlug: "bible-reading-plan",
    title: "Bible Reading Plan — Organize Your Daily Scripture Reading",
    metaDescription: "Create a personalized Bible reading plan to read through Scripture at your own pace. Free tool.",
    h1: "Bible Reading Plan",
    intro: "Build a daily reading plan to guide you through the Bible, whether in a year or at your own pace.",
    faqs: [
      { question: "How long does it take to read the whole Bible?", answer: "Reading about 3-4 chapters a day typically allows you to complete the Bible in one year, though pace can be adjusted." }
    ]
  },
  {
    ptSlug: "cronologia-biblica",
    enSlug: "biblical-timeline",
    title: "Biblical Timeline — Explore Key Events in Order",
    metaDescription: "Explore a chronological timeline of major biblical events and figures. Free reference tool.",
    h1: "Biblical Timeline",
    intro: "Browse a chronological timeline of major events, figures, and periods described in the Bible.",
    faqs: [
      { question: "Why do biblical chronologies vary?", answer: "Different scholars use different methods to estimate dates, especially for ancient events, leading to some variation between timelines." }
    ]
  },
  {
    ptSlug: "calendario-hebraico",
    enSlug: "hebrew-calendar-converter",
    title: "Hebrew Calendar Converter — Convert Dates Instantly",
    metaDescription: "Convert dates between the Hebrew calendar and Gregorian calendar. Free date conversion tool.",
    h1: "Hebrew Calendar Converter",
    intro: "Convert any date between the Hebrew calendar and the standard Gregorian calendar.",
    faqs: [
      { question: "How is the Hebrew calendar different?", answer: "The Hebrew calendar is lunisolar, meaning it follows both moon cycles for months and the sun for years, unlike the purely solar Gregorian calendar." }
    ]
  },
  {
    ptSlug: "fichamento-soap",
    enSlug: "soap-bible-study-method",
    title: "SOAP Bible Study Method — Structured Scripture Journaling",
    metaDescription: "Use the SOAP method (Scripture, Observation, Application, Prayer) to journal your Bible study. Free tool.",
    h1: "SOAP Bible Study Method",
    intro: "Structure your Bible study using the SOAP method: Scripture, Observation, Application, and Prayer.",
    faqs: [
      { question: "What does SOAP stand for in Bible study?", answer: "SOAP stands for Scripture, Observation, Application, and Prayer — a structured method for reflecting on and journaling Bible passages." }
    ]
  },
  {
    ptSlug: "calendario-feriados",
    enSlug: "holiday-calendar",
    title: "Holiday Calendar — Track Public Holidays by Country",
    metaDescription: "View upcoming public holidays and observances by country. Free holiday calendar tool.",
    h1: "Holiday Calendar",
    intro: "Browse public holidays and observances for different countries throughout the year.",
    faqs: [
      { question: "How do I find holidays for a specific country?", answer: "Select your country to see a list of public holidays, their dates, and any special observances throughout the year." }
    ]
  },
  {
    ptSlug: "horas-decimais",
    enSlug: "decimal-hours-converter",
    title: "Decimal Hours Converter — Convert Time to Decimal Format",
    metaDescription: "Convert hours and minutes to decimal format for payroll and time tracking. Free conversion tool.",
    h1: "Decimal Hours Converter",
    intro: "Convert time from hours and minutes into decimal format, useful for payroll and time calculations.",
    faqs: [
      { question: "Why convert time to decimal format?", answer: "Decimal time format simplifies calculations for payroll and billing, since 1.5 hours is easier to multiply than 1 hour 30 minutes." }
    ]
  },
  {
    ptSlug: "organizador-listas",
    enSlug: "list-organizer",
    title: "List Organizer — Sort, Shuffle & Format Lists Free",
    metaDescription: "Sort, shuffle, remove duplicates, and format any list of items. Free list organizer tool.",
    h1: "List Organizer",
    intro: "Clean up, sort, shuffle, or remove duplicates from any list of text or items.",
    faqs: [
      { question: "What can I do with a list organizer?", answer: "You can alphabetize, randomize, remove duplicates, and reformat lists of names, tasks, or any text items." }
    ]
  },
  {
    ptSlug: "porcentagem-reversa",
    enSlug: "reverse-percentage-calculator",
    title: "Reverse Percentage Calculator — Find the Original Value",
    metaDescription: "Calculate the original value before a percentage was applied. Free reverse percentage tool.",
    h1: "Reverse Percentage Calculator",
    intro: "Find the original number before a percentage increase or decrease was applied.",
    faqs: [
      { question: "What is reverse percentage?", answer: "Reverse percentage calculates the starting value when you know the final value and the percentage change that was applied to it." }
    ]
  },
  {
    ptSlug: "custo-nail",
    enSlug: "nail-service-cost-calculator",
    title: "Nail Service Cost Calculator — Price Your Nail Services",
    metaDescription: "Calculate pricing for nail services based on materials, time, and desired profit. Free tool for nail techs.",
    h1: "Nail Service Cost Calculator",
    intro: "Calculate the ideal price for your nail services based on material costs, time spent, and profit margin.",
    faqs: [
      { question: "How do I price my nail services?", answer: "Add up material costs and the value of your time, then add your desired profit margin to arrive at a fair price." }
    ]
  },
  {
    ptSlug: "agenda-unhas",
    enSlug: "nail-appointment-scheduler",
    title: "Nail Appointment Scheduler — Manage Your Client Bookings",
    metaDescription: "Schedule and manage nail service appointments with clients. Free booking tool for nail techs.",
    h1: "Nail Appointment Scheduler",
    intro: "Organize and track appointments with your nail service clients in one simple schedule.",
    faqs: [
      { question: "Why use a dedicated appointment scheduler?", answer: "A dedicated scheduler helps avoid double bookings, track client history, and manage your time more efficiently as a service provider." }
    ]
  },
  {
    ptSlug: "cronograma-capilar",
    enSlug: "hair-care-schedule",
    title: "Hair Care Schedule — Plan Your Hydration & Treatment Routine",
    metaDescription: "Build a personalized hair care schedule with hydration, nutrition, and reconstruction steps. Free tool.",
    h1: "Hair Care Schedule",
    intro: "Create a personalized hair care routine, alternating hydration, nutrition, and reconstruction treatments.",
    faqs: [
      { question: "What is a hair care schedule?", answer: "It's a routine that alternates between hydration, nutrition, and reconstruction treatments to keep hair healthy, typically rotated weekly." }
    ]
  },
  {
    ptSlug: "tarefas-infantil",
    enSlug: "kids-chore-chart",
    title: "Kids Chore Chart — Track Tasks & Rewards for Children",
    metaDescription: "Create a fun chore chart to track kids' tasks and rewards. Free family organization tool.",
    h1: "Kids Chore Chart",
    intro: "Organize daily tasks and rewards for children with a fun, visual chore chart.",
    faqs: [
      { question: "How do chore charts help kids?", answer: "Chore charts build responsibility and routine by giving children clear, visual tasks and a sense of accomplishment when completed." }
    ]
  },
  {
    ptSlug: "conversor-dpi",
    enSlug: "dpi-converter",
    title: "DPI Converter — Convert Image Resolution Instantly",
    metaDescription: "Convert image resolution between DPI, pixels, and print size. Free DPI conversion tool.",
    h1: "DPI Converter",
    intro: "Convert between DPI, pixel dimensions, and physical print size for your images.",
    faqs: [
      { question: "What is DPI?", answer: "DPI (dots per inch) measures print resolution — higher DPI means finer detail, which matters for print quality." }
    ]
  },
  {
    ptSlug: "backlog-gamer",
    enSlug: "gaming-backlog-tracker",
    title: "Gaming Backlog Tracker — Organize Your Game Library",
    metaDescription: "Track and organize the games you own, are playing, or want to play. Free gaming backlog tool.",
    h1: "Gaming Backlog Tracker",
    intro: "Keep track of your gaming backlog — games you own, are currently playing, or plan to play next.",
    faqs: [
      { question: "What is a gaming backlog?", answer: "A gaming backlog is the list of games you've bought but haven't finished or started, helping you plan what to play next." }
    ]
  },
  {
    ptSlug: "gerador-nicks",
    enSlug: "gamertag-generator",
    title: "Gamertag Generator — Create Unique Gaming Usernames",
    metaDescription: "Generate unique and creative gamertags or usernames for gaming. Free username generator.",
    h1: "Gamertag Generator",
    intro: "Generate creative and unique gamertags or usernames for your gaming profiles.",
    faqs: [
      { question: "How do I create a good gamertag?", answer: "Good gamertags are short, memorable, and unique — combining words, numbers, or personal interests often works well." }
    ]
  },
  {
    ptSlug: "spawn-timer",
    enSlug: "respawn-timer",
    title: "Respawn Timer — Track Game Cooldowns & Spawns",
    metaDescription: "Track respawn times and cooldowns for games. Free gaming timer tool.",
    h1: "Respawn Timer",
    intro: "Track respawn timers and cooldowns for objectives, bosses, or items in your favorite games.",
    faqs: [
      { question: "Why use a respawn timer?", answer: "Respawn timers help competitive players track when items, bosses, or objectives become available again, giving a strategic edge." }
    ]
  },
  {
    ptSlug: "conversor-proporcao",
    enSlug: "aspect-ratio-converter",
    title: "Aspect Ratio Converter — Calculate Image & Video Dimensions",
    metaDescription: "Calculate and convert aspect ratios for images and videos. Free aspect ratio calculator.",
    h1: "Aspect Ratio Converter",
    intro: "Calculate dimensions that maintain a specific aspect ratio for images, videos, or designs.",
    faqs: [
      { question: "What is aspect ratio?", answer: "Aspect ratio is the proportional relationship between width and height, like 16:9 for widescreen video or 1:1 for square images." }
    ]
  },
  {
    ptSlug: "paleta-cores",
    enSlug: "color-palette-extractor",
    title: "Color Palette Extractor — Get Colors From Any Image",
    metaDescription: "Extract a color palette from any image instantly. Free color palette generator tool.",
    h1: "Color Palette Extractor",
    intro: "Upload an image and instantly extract its dominant colors as a usable palette.",
    faqs: [
      { question: "What can I use an extracted palette for?", answer: "Extracted palettes are useful for design projects, matching brand colors, or creating cohesive color schemes inspired by photos." }
    ]
  },
  {
    ptSlug: "descobridor-anagramas",
    enSlug: "anagram-finder",
    title: "Anagram Finder — Discover Words From Letters",
    metaDescription: "Find all possible anagrams and words from a set of letters. Free anagram solver tool.",
    h1: "Anagram Finder",
    intro: "Enter a set of letters and discover all the words you can form from them.",
    faqs: [
      { question: "What is an anagram?", answer: "An anagram is a word formed by rearranging the letters of another word or phrase, using all the original letters exactly once." }
    ]
  },
  {
    ptSlug: "calculadora-churrasco",
    enSlug: "bbq-calculator",
    title: "BBQ Calculator — Estimate Meat & Drinks Per Guest",
    metaDescription: "Calculate how much meat, drinks, and supplies you need for your BBQ based on guest count. Free tool.",
    h1: "BBQ Calculator",
    intro: "Calculate exactly how much meat, drinks, and supplies you need based on your number of guests.",
    faqs: [
      { question: "How much meat per person for a BBQ?", answer: "A common estimate is 300-400g of meat per person, though this varies based on appetite, side dishes, and event length." }
    ]
  },
  {
    ptSlug: "link-whatsapp",
    enSlug: "whatsapp-link-generator",
    title: "WhatsApp Link Generator — Create Click-to-Chat Links",
    metaDescription: "Generate a WhatsApp click-to-chat link with a pre-filled message. Free link generator tool.",
    h1: "WhatsApp Link Generator",
    intro: "Create a direct WhatsApp link that opens a chat with a pre-filled message, no contact saving required.",
    faqs: [
      { question: "How do WhatsApp click-to-chat links work?", answer: "These links open a chat directly with a specific number and optional pre-filled message, without needing the number saved as a contact." }
    ]
  },
  {
    ptSlug: "formatador-texto",
    enSlug: "text-formatter",
    title: "Text Formatter — Clean Up & Format Text Free",
    metaDescription: "Format text with case changes, spacing fixes, and cleanup tools. Free text formatting tool.",
    h1: "Text Formatter",
    intro: "Clean up and reformat text — fix spacing, change case, and remove unwanted characters.",
    faqs: [
      { question: "What text formatting options are available?", answer: "Common options include uppercase/lowercase conversion, removing extra spaces, trimming line breaks, and stripping special characters." }
    ]
  },
  {
    ptSlug: "gerador-recibo",
    enSlug: "receipt-generator",
    title: "Receipt Generator — Create Simple Payment Receipts",
    metaDescription: "Generate a simple payment receipt for services or products. Free receipt generator tool.",
    h1: "Receipt Generator",
    intro: "Create a simple, professional receipt for payments received for goods or services.",
    faqs: [
      { question: "What should a receipt include?", answer: "A basic receipt should include the date, payer and recipient names, amount, description of goods or services, and payment method." }
    ]
  },
  {
    ptSlug: "descobridor-signo",
    enSlug: "zodiac-sign-finder",
    title: "Zodiac Sign Finder — Discover Your Astrological Sign",
    metaDescription: "Find your zodiac sign based on your birth date. Free astrology sign calculator.",
    h1: "Zodiac Sign Finder",
    intro: "Enter your birth date to instantly discover your zodiac sign.",
    faqs: [
      { question: "How is my zodiac sign determined?", answer: "Your zodiac sign is determined by the date range your birthday falls into, based on the position of the sun at your time of birth." }
    ]
  },
  {
    ptSlug: "compatibilidade-signos",
    enSlug: "zodiac-compatibility-calculator",
    title: "Zodiac Compatibility Calculator — Check Sign Match",
    metaDescription: "Check love and friendship compatibility between two zodiac signs. Free astrology compatibility tool.",
    h1: "Zodiac Compatibility Calculator",
    intro: "Discover how compatible two zodiac signs are in love, friendship, and work relationships.",
    faqs: [
      { question: "How is zodiac compatibility calculated?", answer: "Compatibility is based on the elements (fire, earth, air, water) and qualities (cardinal, fixed, mutable) of each sign, following traditional astrological principles." }
    ]
  },
  {
    ptSlug: "mapa-numerologico",
    enSlug: "numerology-chart-calculator",
    title: "Numerology Chart Calculator — Discover Your Destiny Number",
    metaDescription: "Calculate your numerology destiny number from your birth date. Free numerology chart tool.",
    h1: "Numerology Chart Calculator",
    intro: "Find your Destiny Number in numerology by entering your full birth date, and learn what it reveals about your life path.",
    faqs: [
      { question: "What is a destiny number in numerology?", answer: "Your destiny number is calculated by reducing the digits of your birth date to a single digit (except master numbers 11, 22, and 33), revealing your life path." }
    ]
  },
  {
    ptSlug: "sugestor-livros",
    enSlug: "book-recommendation-finder",
    title: "Book Recommendation Finder — Discover Your Next Read",
    metaDescription: "Answer a few questions and get personalized book recommendations. Free book suggestion tool.",
    h1: "Book Recommendation Finder",
    intro: "Take a quick quiz about your reading preferences and get tailored book recommendations.",
    faqs: [
      { question: "How are book recommendations chosen?", answer: "Recommendations are based on your answers about preferred genre, length, reading level, and the type of experience you want from a book." }
    ]
  },
  {
    ptSlug: "significado-nomes",
    enSlug: "name-meaning-finder",
    title: "Name Meaning Finder — Discover Name Origins & Meanings",
    metaDescription: "Find the origin, meaning, and curiosities of any name. Free name meaning and etymology tool.",
    h1: "Name Meaning Finder",
    intro: "Search for any name to discover its origin, meaning, and interesting facts about its history.",
    faqs: [
      { question: "How accurate are name meanings?", answer: "Name meanings are based on etymological research from recognized sources. Origins and meanings can vary across cultures and languages." }
    ]
  },
  {
    ptSlug: "idade-pet",
    enSlug: "pet-age-calculator",
    title: "Pet Age Calculator — Convert Pet Years to Human Years",
    metaDescription: "Calculate your dog or cat's age in human years based on species and size. Free pet age converter.",
    h1: "Pet Age Calculator",
    intro: "Convert your pet's real age into human years, taking into account species and size for a more accurate estimate.",
    faqs: [
      { question: "How is pet age calculated?", answer: "Pet age is calculated using species-specific formulas. For dogs, size (small, medium, large) also affects the conversion, as larger dogs age faster." }
    ]
  },
  {
    ptSlug: "consumo-racao",
    enSlug: "pet-food-calculator",
    title: "Pet Food Calculator — Daily Food Intake for Dogs & Cats",
    metaDescription: "Calculate the ideal daily food amount for your dog or cat based on weight, age, and activity. Free pet food calculator.",
    h1: "Pet Food Calculator",
    intro: "Find out how much food your pet should eat each day based on weight, life stage, and activity level.",
    faqs: [
      { question: "How much should I feed my pet?", answer: "Daily food intake depends on your pet's weight, age (puppy, adult, senior), and activity level. The calculator uses established veterinary guidelines to estimate portions." }
    ]
  },
  {
    ptSlug: "nomes-pets",
    enSlug: "pet-name-generator",
    title: "Pet Name Generator — Creative Names for Dogs & Cats",
    metaDescription: "Generate creative names for your dog or cat filtered by coat color and theme. Free pet name generator.",
    h1: "Pet Name Generator",
    intro: "Get creative name ideas for your new pet, filtered by species, coat color, and fun themes like nerd, classic, funny, food, and famous.",
    faqs: [
      { question: "How are pet names generated?", answer: "Names are randomly selected from curated lists organized by species, coat color, and theme, giving you a fresh batch of suggestions every time." }
    ]
  },
  {
    ptSlug: "vacinas-pet",
    enSlug: "pet-vaccine-tracker",
    title: "Pet Vaccine Tracker — Track Vaccines & Reminders",
    metaDescription: "Track your pet's vaccines, deworming, and booster reminders. Free pet vaccination schedule tracker.",
    h1: "Pet Vaccine Tracker",
    intro: "Register your pets, log their vaccines and deworming dates, and get visual alerts when boosters are due.",
    faqs: [
      { question: "What vaccines does my pet need?", answer: "Dogs typically need V8/V10, rabies, giardia, and canine cough vaccines. Cats need feline quadruple/quintuple, rabies, and FeLV. Boosters are usually annual, following WSAVA guidelines." }
    ]
  },
  {
    ptSlug: "acumulador-horas",
    enSlug: "work-hours-tracker",
    title: "Work Hours Tracker — Calculate Total Hours Worked",
    metaDescription: "Track and calculate total hours worked from time entries. Free work hours calculator.",
    h1: "Work Hours Tracker",
    intro: "Add your clock-in and clock-out times to calculate total hours worked for the day or week.",
    faqs: [
      { question: "How do I calculate total work hours?", answer: "Subtract your start time from your end time for each period, then add all periods together to get your total hours worked." }
    ]
  },
  {
    ptSlug: "reserva-emergencia",
    enSlug: "emergency-fund-calculator",
    title: "Emergency Fund Calculator — How Much Should You Save?",
    metaDescription: "Calculate how much you need in your emergency fund based on your monthly expenses, for free.",
    h1: "Emergency Fund Calculator",
    intro: "Find out how much you should save for emergencies, based on your essential monthly expenses and desired safety net (in months of coverage).",
    faqs: [
      { question: "How many months of expenses should an emergency fund cover?", answer: "Most financial experts recommend saving 3 to 6 months of essential expenses, though this can vary based on job stability and personal circumstances." }
    ]
  },
  {
    ptSlug: "gerador-nomes-bebes",
    enSlug: "baby-name-generator",
    title: "Baby Name Generator — Free Baby Name Ideas",
    metaDescription: "Generate creative and meaningful baby name ideas for free, for boys, girls, or gender-neutral names.",
    h1: "Baby Name Generator",
    intro: "Get creative baby name suggestions, with options to filter by gender and style, to help you find the perfect name.",
    faqs: [
      { question: "Can I search by name meaning?", answer: "Depending on the version, you can filter suggestions by theme or style, though full meaning-based search may vary." }
    ]
  },
];

export const enSlugToPtSlug: Record<string, string> = Object.fromEntries(
  toolsSeoEN.map((tool) => [tool.enSlug, tool.ptSlug])
);
export const ptSlugToEnSlug: Record<string, string> = Object.fromEntries(
  toolsSeoEN.map((tool) => [tool.ptSlug, tool.enSlug])
);
export const toolsSeoENByPtSlug: Record<string, ToolSeoEN> = Object.fromEntries(
  toolsSeoEN.map((tool) => [tool.ptSlug, tool])
);
