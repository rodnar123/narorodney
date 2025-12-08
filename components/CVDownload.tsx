"use client";

import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CVDownload = () => {
  const handleDownload = () => {
    // Create CV content as HTML that can be printed as PDF
    const cvContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rodney Naro - CV</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 850px;
      margin: 0 auto;
      padding: 40px 60px;
      background: #fff;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 3px solid #2563eb;
    }
    h1 {
      font-size: 36px;
      color: #1e40af;
      margin-bottom: 10px;
      font-weight: 700;
    }
    .contact-info {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 15px;
      font-size: 12px;
      color: #666;
      margin-top: 10px;
    }
    .contact-info span {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .section {
      margin-bottom: 25px;
    }
    h2 {
      font-size: 20px;
      color: #1e40af;
      margin-bottom: 12px;
      padding-bottom: 6px;
      border-bottom: 2px solid #93c5fd;
      font-weight: 600;
    }
    h3 {
      font-size: 16px;
      color: #1e293b;
      margin-bottom: 5px;
      font-weight: 600;
    }
    .job-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 8px;
    }
    .job-title {
      font-weight: 600;
      color: #1e40af;
      font-size: 15px;
    }
    .date {
      font-size: 13px;
      color: #64748b;
      font-style: italic;
    }
    .company {
      font-size: 14px;
      color: #475569;
      margin-bottom: 8px;
    }
    ul {
      margin-left: 20px;
      margin-bottom: 15px;
    }
    li {
      margin-bottom: 6px;
      font-size: 14px;
      color: #475569;
    }
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
      margin-bottom: 15px;
    }
    .skill-category {
      background: #f8fafc;
      padding: 12px;
      border-radius: 6px;
      border-left: 3px solid #2563eb;
    }
    .skill-category h4 {
      font-size: 14px;
      color: #1e40af;
      margin-bottom: 6px;
      font-weight: 600;
    }
    .skill-category p {
      font-size: 13px;
      color: #64748b;
      line-height: 1.5;
    }
    .education-item {
      margin-bottom: 15px;
    }
    .degree {
      font-weight: 600;
      color: #1e40af;
      font-size: 15px;
    }
    .institution {
      font-size: 14px;
      color: #475569;
      margin-top: 3px;
    }
    .summary {
      font-size: 14px;
      color: #475569;
      line-height: 1.7;
      text-align: justify;
      margin-bottom: 20px;
      padding: 15px;
      background: #f8fafc;
      border-radius: 6px;
    }
    .referees {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }
    .referee {
      background: #f8fafc;
      padding: 15px;
      border-radius: 6px;
      border-left: 3px solid #2563eb;
    }
    .referee h4 {
      font-size: 15px;
      color: #1e40af;
      margin-bottom: 5px;
      font-weight: 600;
    }
    .referee p {
      font-size: 13px;
      color: #64748b;
      margin-bottom: 3px;
    }
    @media print {
      body { padding: 20px; }
      .section { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>RODNEY NARO</h1>
    <div class="contact-info">
      <span>📧 rodney.naro@gmail.com</span>
      <span>📱 +675 71612768</span>
      <span>📍 PNG Unitech, Lae, PNG</span>
      <span>🔗 <a href="https://www.linkedin.com/in/rodney-naro-74378062/">LinkedIn Profile</a></span>
    </div>
  </div>

  <div class="section">
    <h2>Professional Summary</h2>
    <p class="summary">
      Master's degree holder in Information Technology with specialized expertise in cloud computing, AI, business intelligence, 
      and full-stack application development. Experienced IT tutor and researcher with strong focus on modern web and mobile 
      technologies including React, React Native, Flutter, and Python. Proven track record in delivering educational content 
      and developing practical business automation solutions. Result-oriented professional with deep understanding of ICT 
      trends and systems integration within business processes.
    </p>
  </div>

  <div class="section">
    <h2>Work Experience</h2>
    
    <div class="job-header">
      <div>
        <div class="job-title">IT Tutor</div>
        <div class="company">PNG University of Technology - Department of Business Studies - IT Section</div>
      </div>
      <div class="date">2017 - Present</div>
    </div>
    <ul>
      <li>Coordinate DBS timetable and deliver lectures/tutorials to undergraduate students</li>
      <li>Mentor students in programming, web development, and mobile application development</li>
      <li>Conduct research on conceptual models and frameworks in IT education</li>
      <li>Successfully completed Master of Information Technology during tenure</li>
    </ul>

    <div class="job-header">
      <div>
        <div class="job-title">Logistics Support Specialist</div>
        <div class="company">Oceanic Communications PNG Ltd (Digicel), Port Moresby</div>
      </div>
      <div class="date">2007 - 2011</div>
    </div>
    <ul>
      <li>Managed inventory and supervised stock movements to outer regions</li>
      <li>Provided logistics support during the launch of Digicel cellular network</li>
      <li>Coordinated equipment distribution and tracked inventory systems</li>
    </ul>
  </div>

  <div class="section">
    <h2>Education</h2>
    
    <div class="education-item">
      <div class="degree">Master of Information Technology (MIT)</div>
      <div class="institution">Southern Institute of Technology, New Zealand</div>
      <div class="date">2020 - 2021</div>
    </div>

    <div class="education-item">
      <div class="degree">Post-Graduate Certificate in Student-Centered Learning</div>
      <div class="institution">PNG University of Technology - Teaching & Learning Management Unit</div>
      <div class="date">2018</div>
    </div>

    <div class="education-item">
      <div class="degree">Bachelor of Commerce in Information Technology (BCIT)</div>
      <div class="institution">PNG University of Technology - Department of Business Studies - IT Section</div>
      <div class="date">2013 - 2016</div>
    </div>
  </div>

  <div class="section">
    <h2>Technical Skills</h2>
    <div class="skills-grid">
      <div class="skill-category">
        <h4>Programming Languages</h4>
        <p>JavaScript, TypeScript, Python, PHP, Java, C++, Visual Basic, Dart, Kotlin</p>
      </div>
      <div class="skill-category">
        <h4>Web Development</h4>
        <p>React, Next.js, HTML5, CSS3, Tailwind CSS, Laravel, Node.js</p>
      </div>
      <div class="skill-category">
        <h4>Mobile Development</h4>
        <p>React Native, Flutter, Android (Kotlin/Java)</p>
      </div>
      <div class="skill-category">
        <h4>Specialized Areas</h4>
        <p>Cloud Computing, AI/ML, Business Intelligence, Big Data Analytics, Database Management</p>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>Key Projects</h2>
    <ul>
      <li><strong>Mobile Development (Native & Hybrid):</strong> React Native with Expo Go for cross-platform mobile applications. View published apps: <a href="https://play.google.com/store/apps/dev?id=7448311955323151930" style="color: #2563eb;">Google Play Store</a></li>
      <li><strong>Open Source Contributions:</strong> Active development and contributions available on <a href="https://github.com/rodnar123" style="color: #2563eb;">GitHub</a></li>
      <li><strong>Research Work:</strong> Active research in datafication, dataism, dataveillance, and development of conceptual models and frameworks for ICT integration.</li>
    </ul>
  </div>

  <div class="section">
    <h2>Tech Stack Summary - Continuing to Explore</h2>
    <ul style="column-count: 2; column-gap: 30px;">
      <li><strong>Next.js</strong> – Full-stack framework (frontend + backend)</li>
      <li><strong>TypeScript</strong> – Type-safe, reliable code</li>
      <li><strong>React Native</strong> – Mobile development with Expo Go</li>
      <li><strong>Tailwind CSS</strong> – Fast, modern, responsive styling</li>
      <li><strong>Next/Better Auth</strong> – Simple, secure authentication</li>
      <li><strong>Shadcn/ui</strong> – Professional UI components</li>
      <li><strong>Framer Motion</strong> – Smooth UI animations</li>
      <li><strong>GSAP</strong> – Advanced interactive animations</li>
      <li><strong>Three.js</strong> – 3D graphics and immersive visuals</li>
      <li><strong>Aceternity UI</strong> – Modern design effects</li>
      <li><strong>Prisma ORM</strong> – Clean database access with TypeScript</li>
      <li><strong>PostgreSQL</strong> – Production-grade SQL database</li>
      <li><strong>Supabase</strong> – Managed PostgreSQL with APIs, auth, storage</li>
      <li><strong>Vercel</strong> – Cloud deployment and hosting platform</li>
    </ul>
  </div>

  <div class="section">
    <h2>Research Interests</h2>
    <p style="font-size: 14px; color: #475569; margin-bottom: 10px;">
      Datafication, Dataism, and Dataveillance • Domestic/In-house Software Development • 
      Infodemic and Conspiracy Theories • ICT Systems Integration • Business Process Automation
    </p>
  </div>

  <div class="section">
    <h2>References</h2>
    <div class="referees">
      <div class="referee">
        <h4>Professor Zhaohao Sun</h4>
        <p>PNG University of Technology</p>
        <p>Department of Business Studies - IT Section</p>
        <p>📧 zhaohao.sun@pnguot.ac.pg</p>
        <p>📞 +675 473 4401</p>
      </div>
      <div class="referee">
        <h4>Francisca Pambel</h4>
        <p>IT Section Head - Lecturer</p>
        <p>PNG University of Technology</p>
        <p>📧 francisca.pambel@pnguot.ac.pg</p>
        <p>📞 +675 473 4401</p>
      </div>
    </div>
  </div>
</body>
</html>
    `;

    // Create a new window with the CV
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(cvContent);
      printWindow.document.close();
      
      // Wait for content to load, then trigger print dialog
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
        }, 250);
      };
    }
  };

  return (
    <Button
      onClick={handleDownload}
      className="h-9 sm:h-10 px-3 sm:px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-xs sm:text-sm font-semibold shadow-lg shadow-emerald-500/50 transition-all duration-300"
    >
      <Download className="mr-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />
      Download CV
    </Button>
  );
};

export default CVDownload;
