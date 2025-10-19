"use client";

import { useRef } from "react";
import { projects } from "@modules/portfolio/data";
import { experiences } from "@modules/portfolio/experiences";

export default function PortfolioContent() {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    if (typeof window === "undefined") return;

    window.print();
  };

  return (
    <>
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #portfolio-content,
          #portfolio-content * {
            visibility: visible;
          }
          #portfolio-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            font-size: 10pt;
          }
          .no-print {
            display: none !important;
          }
          .page-break {
            page-break-after: always;
          }
          @page {
            margin: 0;
            size: A4;
          }

          /* Remove all browser headers and footers */
          @page :left {
            margin: 0;
          }
          @page :right {
            margin: 0;
          }
          @page :first {
            margin: 0;
          }

          /* Add padding inside content to simulate margins */
          #portfolio-content {
            padding: 25mm 20mm;
            box-sizing: border-box;
            min-height: 297mm; /* A4 height */
          }

          /* Custom page number (won't work in all browsers) */
          @media print {
            .page-number {
              position: fixed;
              bottom: 10mm;
              right: 20mm;
              font-size: 9pt;
              color: #666;
            }

            /* Add spacing between sections for better page breaks */
            section {
              break-inside: avoid;
              page-break-inside: avoid;
            }

            /* Ensure headers don't get orphaned */
            h2 {
              break-after: avoid;
              page-break-after: avoid;
            }
          }

          /* Ensure minimum font sizes for print */
          .print-title {
            font-size: 20pt !important;
          }
          .print-subtitle {
            font-size: 11pt !important;
          }
          .print-heading {
            font-size: 14pt !important;
          }
          .print-subheading {
            font-size: 12pt !important;
          }
          .print-body {
            font-size: 10px;
            line-height: 1.5;
          }
          .print-small {
            font-size: 10pt !important;
          }
        }

        @media (max-width: 768px) {
          .mobile-responsive {
            padding: 1rem;
          }
        }
      `}</style>

      <div>
        <button
          onClick={handleDownloadPDF}
          className="no-print fixed top-16 sm:top-20 right-4 sm:right-6 z-10 px-3 sm:px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 text-xs sm:text-sm font-medium shadow-lg"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span className="hidden sm:inline">PDF 다운로드</span>
          <span className="sm:hidden">PDF</span>
        </button>

        <div
          id="portfolio-content"
          ref={contentRef}
          className="bg-white text-gray-900"
        >
          <header className="border-b-2 border-gray-900 pb-4 sm:pb-6 mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 print-title">
              포트폴리오
            </h1>
            <p className="text-base sm:text-lg text-gray-700 print-subtitle leading-relaxed">
              사용자 경험과 성능을 중시하는 프로덕트 엔지니어입니다.
            </p>
          </header>

          <section className="mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4 sm:mb-5 print-heading">
              경력
            </h2>
            <div className="space-y-4 sm:space-y-5">
              {experiences.map((exp) => (
                <div
                  key={`${exp.company}-${exp.role}`}
                  className="pb-4 sm:pb-5"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                    <div>
                      <h3 className="font-bold text-base sm:text-lg print-subheading">
                        {exp.company}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 print-body">
                        {exp.role}
                      </p>
                    </div>
                    <span className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-0 print-body">
                      {exp.period}
                    </span>
                  </div>
                  {exp.details && (
                    <ul className="mt-3 ml-5 text-sm sm:text-base text-gray-700 list-disc print-body space-y-1">
                      {exp.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4 sm:mb-5 print-heading">
              프로젝트
            </h2>
            <div className="space-y-4 sm:space-y-5">
              {projects.map((project) => (
                <div
                  key={project.title}
                  className="pb-4 sm:pb-5 border-b border-gray-200 last:border-0"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                    <h3 className="font-bold text-base sm:text-lg print-subheading">
                      {project.title}
                    </h3>
                    {project.period && (
                      <span className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-0 print-body">
                        {project.period}
                      </span>
                    )}
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 mb-3 print-body leading-relaxed">
                    {project.description}
                  </p>
                  {project.highlights && project.highlights.length > 0 && (
                    <ul className="ml-5 text-sm sm:text-base text-gray-600 list-disc mb-3 print-body space-y-1">
                      {project.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  )}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 sm:px-2.5 py-1 text-xs sm:text-sm border border-gray-400 rounded print-small"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <footer className="border-t-2 border-gray-300 pt-4 sm:pt-5 text-sm sm:text-base text-gray-600 print-body no-print">
            <p>협업이나 제안이 있다면 연락 주세요.</p>
          </footer>
        </div>
      </div>
    </>
  );
}
