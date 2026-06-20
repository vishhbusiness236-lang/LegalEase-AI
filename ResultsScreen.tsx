import React from 'react';
import { motion } from 'motion/react';
import { ReportData } from './types.ts';
import { CheckSquare, Square, AlertCircle, Phone, Globe, Mail, SquareArrowOutUpRight } from 'lucide-react';

interface ResultsScreenProps {
  data: ReportData;
}

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-card border border-card-border rounded-[24px] p-8 lg:p-10 shadow-lg ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl lg:text-2xl font-semibold text-text-primary mb-6 tracking-tight">{children}</h2>
);

export function ResultsScreen({ data }: ResultsScreenProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full max-w-[1024px] mx-auto pb-32 px-4"
    >
      <div className="pt-12 mb-10">
        <h1 className="text-3xl lg:text-4xl font-semibold text-text-primary mb-3 tracking-tight">Financial Hold Analysis</h1>
        <p className="text-text-muted text-lg">Extracted directly from your uploaded document</p>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10 lg:mb-12">
        <Card className="!p-8">
          <p className="text-sm font-bold text-text-muted uppercase tracking-widest mb-3">Outstanding Balance</p>
          <p className="text-4xl lg:text-5xl font-semibold text-text-primary tracking-tight">{data.summary.outstandingBalance}</p>
        </Card>
        <Card className="!p-8">
          <p className="text-sm font-bold text-text-muted uppercase tracking-widest mb-3">Deadline</p>
          <p className="text-2xl lg:text-3xl font-semibold text-text-primary mt-3 tracking-tight">{data.summary.deadline}</p>
        </Card>
        <Card className="!p-8">
          <p className="text-sm font-bold text-text-muted uppercase tracking-widest mb-3">Next Action</p>
          <p className="text-2xl lg:text-3xl font-semibold text-text-primary mt-3 tracking-tight">{data.summary.nextAction}</p>
        </Card>
      </div>

      {/* Classification Badge */}
      <div className="bg-badge-bg border border-white/5 text-badge-text px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide w-max mb-8 shadow-sm">
        {data.classification}
      </div>

      <div className="flex flex-col gap-8">
        {/* Card 1: Problem Explanation */}
        <Card>
          <CardTitle>Problem Explanation</CardTitle>
          <p className="text-text-secondary leading-relaxed text-lg lg:text-xl">
            {data.problemExplanation}
          </p>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 2: Amount Due */}
          <Card className="flex flex-col justify-center">
            <CardTitle>Amount Due</CardTitle>
            {data.amountDue ? (
              <p className="text-6xl font-bold text-text-primary tracking-tighter">{data.amountDue}</p>
            ) : (
              <p className="text-text-secondary text-lg">Not stated in the document.</p>
            )}
          </Card>

          {/* Card 6: Deadline */}
          <Card>
            <CardTitle>Deadline</CardTitle>
            {data.deadlines && data.deadlines.length > 0 ? (
              <div className="flex flex-col gap-4 mt-2">
                {data.deadlines.map((deadline, idx) => (
                  <p key={idx} className="text-xl font-medium text-text-primary leading-snug">{deadline}</p>
                ))}
              </div>
            ) : (
              <p className="text-text-secondary text-lg">No deadline is mentioned in the document.</p>
            )}
          </Card>
        </div>

        {/* Card 7: Steps to Resolve the Issue */}
        <Card>
          <CardTitle>Steps to Resolve</CardTitle>
          <div className="flex flex-col gap-5 mt-6">
            {data.stepsToResolve.map((step, idx) => (
              <div key={idx} className="flex items-start gap-5 cursor-pointer group p-3 -mx-3 rounded-xl hover:bg-white/5 transition-colors">
                <div className="mt-0.5 text-text-muted group-hover:text-white transition-colors">
                  {step.completed ? <CheckSquare size={24} /> : <Square size={24} strokeWidth={1.5} />}
                </div>
                <span className={`text-xl transition-colors ${step.completed ? 'text-text-muted line-through' : 'text-text-secondary group-hover:text-white'}`}>
                  {step.action}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 3: Available Options */}
          <Card>
            <CardTitle>Available Options</CardTitle>
            <ul className="list-disc list-outside ml-6 space-y-3 text-text-secondary text-lg">
              {data.availableOptions.map((option, idx) => (
                <li key={idx} className="pl-2 marker:text-text-muted">{option}</li>
              ))}
            </ul>
          </Card>

          {/* Card 8: Important Warnings */}
          <Card className="border-red-500/10 bg-red-500/[0.02]">
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle size={24} className="text-red-400" />
              <h2 className="text-2xl font-semibold text-text-primary tracking-tight">Important Warnings</h2>
            </div>
            <div className="flex flex-col gap-4 border-l-[3px] border-red-500/30 pl-5 py-1">
              {data.importantWarnings.map((warning, idx) => (
                <p key={idx} className="text-text-secondary text-lg leading-snug">{warning}</p>
              ))}
            </div>
          </Card>
        </div>

        {/* Repositories and Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 4: University Resources */}
          <Card>
            <CardTitle>University Resources</CardTitle>
            <div className="flex flex-col gap-5 text-lg mt-2">
              {data.universityResources.map((resource, idx) => (
                <div key={idx} className="flex flex-col gap-1 border-b border-card-border pb-5 last:border-0 last:pb-0">
                  <span className="font-medium text-text-primary">{resource.name}</span>
                  {resource.contact && <span className="text-text-muted text-base">{resource.contact}</span>}
                </div>
              ))}
            </div>
          </Card>

          {/* Card 5: External Resources */}
          <Card>
            <CardTitle>External Resources</CardTitle>
            <div className="flex flex-col gap-8 mt-2">
              {data.externalResources.map((resource, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-medium text-text-primary text-lg">{resource.name}</h3>
                    <span className="text-xs font-medium tracking-wide bg-white/10 text-text-secondary px-2.5 py-1 rounded-md">{resource.type}</span>
                  </div>
                  <p className="text-base text-text-secondary leading-relaxed">{resource.description}</p>
                  <div className="flex items-center gap-1.5 text-blue-400 text-sm mt-1 cursor-pointer w-max hover:underline hover:text-blue-300 transition-colors">
                    <Globe size={14} />
                    <span className="font-medium">{resource.website}</span>
                    <SquareArrowOutUpRight size={12} className="ml-0.5 opacity-70" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Card 9: Official Contact Information */}
        <Card>
          <CardTitle>Official Contacts</CardTitle>
          {data.officialContact ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-8 gap-x-8 mt-4">
              {data.officialContact.phones.length > 0 && (
                <div className="flex flex-col gap-3">
                  <span className="text-text-muted font-bold uppercase tracking-widest text-xs flex items-center gap-2"><Phone size={14}/> Phone</span>
                  <div className="flex flex-col gap-2 relative z-10">
                    {data.officialContact.phones.map((p, i) => <span key={i} className="text-text-primary text-lg">{p}</span>)}
                  </div>
                </div>
              )}
              {data.officialContact.emails.length > 0 && (
                <div className="flex flex-col gap-3">
                  <span className="text-text-muted font-bold uppercase tracking-widest text-xs flex items-center gap-2"><Mail size={14}/> Email</span>
                  <div className="flex flex-col gap-2">
                    {data.officialContact.emails.map((e, i) => <span key={i} className="text-text-primary text-lg">{e}</span>)}
                  </div>
                </div>
              )}
              {data.officialContact.websites.length > 0 && (
                <div className="flex flex-col gap-3">
                  <span className="text-text-muted font-bold uppercase tracking-widest text-xs flex items-center gap-2"><Globe size={14}/> Portal</span>
                  <div className="flex flex-col gap-2">
                    {data.officialContact.websites.map((w, i) => <span key={i} className="text-blue-400 hover:text-blue-300 cursor-pointer text-lg break-all transition-colors">{w}</span>)}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-text-secondary text-lg">No contact information found.</p>
          )}
        </Card>

        {/* Card 10: Bottom Line */}
        <Card className="!p-8 sm:!p-12 box-border relative overflow-hidden bg-[#1c1c1c] border-white/10 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <CardTitle><span className="relative z-10">Bottom Line</span></CardTitle>
          <div className="flex flex-col gap-8 mt-8 relative z-10">
            <div>
              <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-2">What Happened</p>
              <p className="text-text-primary text-xl leading-relaxed">{data.bottomLine.whatHappened}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-2">What to Do</p>
              <p className="text-text-primary text-xl leading-relaxed">{data.bottomLine.whatToDo}</p>
            </div>
            <div className="bg-white/5 -mx-6 sm:-mx-8 px-6 sm:px-8 py-6 rounded-xl mt-2 border border-white/5">
              <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-2">Next Priority</p>
              <p className="text-white font-medium text-xl leading-relaxed">{data.bottomLine.nextPriority}</p>
            </div>
          </div>
        </Card>

        {/* Card 11: Questions That Need Clarification */}
        {data.clarifications && data.clarifications.length > 0 && (
          <div className="bg-[#141414] border border-card-border/60 rounded-[24px] p-8 lg:p-10 mt-4">
            <h2 className="text-xl font-medium text-text-muted mb-6 tracking-tight flex items-center gap-2">Questions That Need Clarification</h2>
            <ul className="list-disc list-outside ml-6 space-y-3 text-text-muted text-lg">
              {data.clarifications.map((q, idx) => (
                <li key={idx} className="pl-2 marker:text-white/20">{q}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* Footer warning */}
      <div className="mt-20 text-center flex justify-center">
         <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-text-muted text-xs font-medium uppercase tracking-wider opacity-80 shadow-sm">
            <AlertCircle size={14} />
            This is just an AI model and it may make a mistake
         </div>
      </div>

    </motion.div>
  );
}
