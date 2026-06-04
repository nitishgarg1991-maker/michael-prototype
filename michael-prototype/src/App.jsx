import { useState } from "react";

const T = {
  bg: '#06080e', surface: '#0c1422', card: '#101829', border: '#192035',
  blue: '#3b82f6', blueLight: '#60a5fa', teal: '#0891b2',
  green: '#22c55e', red: '#ef4444', amber: '#f59e0b', purple: '#a78bfa',
  text: '#e2e8f0', textSec: '#7c8fa8', muted: '#2a3548',
};

const Badge = ({ type, code }) => (
  <span style={{
    display:'inline-flex',alignItems:'center',gap:3,padding:'2px 7px',borderRadius:4,
    fontSize:9,fontWeight:700,letterSpacing:'.6px',textTransform:'uppercase',
    background:type==='new'?'#0d2150':'#0a1f10',
    color:type==='new'?T.blueLight:'#4ade80',
    border:`1px solid ${type==='new'?'#1e3d80':'#173020'}`,
  }}>{type==='new'?'✦ NEW':'● EXISTING'}{code?` · ${code}`:''}</span>
);

const Card = ({ children, style={}, onClick }) => (
  <div onClick={onClick} style={{background:T.card,borderRadius:12,padding:'14px 16px',
    border:`1px solid ${T.border}`,cursor:onClick?'pointer':'default',...style}}>
    {children}
  </div>
);

const Row = ({ label, value, color=T.text }) => (
  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',
    padding:'7px 0',borderBottom:`1px solid ${T.border}`}}>
    <span style={{color:T.textSec,fontSize:12}}>{label}</span>
    <span style={{color,fontSize:12,fontWeight:600}}>{value}</span>
  </div>
);

const SectionHead = ({ title, badge, cta, onCta }) => (
  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
    <div style={{display:'flex',alignItems:'center',gap:7}}>
      <span style={{color:T.text,fontSize:13,fontWeight:600}}>{title}</span>
      {badge&&<Badge {...badge}/>}
    </div>
    {cta&&<button onClick={onCta} style={{background:'none',border:'none',color:T.blueLight,fontSize:11,cursor:'pointer'}}>{cta} →</button>}
  </div>
);

const BackBtn = ({ onBack, title }) => (
  <div style={{padding:'12px 16px 8px',display:'flex',alignItems:'center',gap:10}}>
    <button onClick={onBack} style={{background:'none',border:'none',color:T.blueLight,cursor:'pointer',fontSize:22,padding:0,lineHeight:1}}>‹</button>
    <span style={{color:T.text,fontSize:15,fontWeight:600}}>{title}</span>
  </div>
);

const Pill = ({ label, active, onClick }) => (
  <button onClick={onClick} style={{padding:'5px 12px',borderRadius:20,border:'none',fontSize:11,cursor:'pointer',
    background:active?T.blue:'rgba(255,255,255,0.07)',color:active?'white':T.textSec,fontWeight:active?700:400}}>{label}</button>
);

const AttrBar = ({ label, pct, value, color, onClick }) => (
  <div style={{marginBottom:9,cursor:onClick?'pointer':'default'}} onClick={onClick}>
    <div style={{display:'flex',justifyContent:'space-between',marginBottom:3}}>
      <span style={{color:T.text,fontSize:11,fontWeight:600}}>{label}</span>
      <span style={{color,fontSize:11,fontWeight:600}}>{value}</span>
    </div>
    <div style={{height:5,background:T.muted,borderRadius:3,overflow:'hidden'}}>
      <div style={{height:'100%',width:`${Math.min(Math.abs(pct),100)}%`,
        background:`linear-gradient(90deg,${color},${color}aa)`,borderRadius:3}}/>
    </div>
  </div>
);

function DonutChart() {
  const data = [
    {pct:72,color:'#ef4444'},{pct:12,color:'#3b82f6'},
    {pct:7,color:'#f59e0b'},{pct:5,color:'#22c55e'},{pct:4,color:'#64748b'},
  ];
  const r=50,cx=70,cy=70;let angle=-90;
  const arcs = data.map(d=>{
    const sweep=(d.pct/100)*358,start=angle;
    angle+=sweep+(angle===-90?0:1);
    const a1=(start*Math.PI/180),a2=((start+sweep)*Math.PI/180);
    const x1=cx+r*Math.cos(a1),y1=cy+r*Math.sin(a1);
    const x2=cx+r*Math.cos(a2),y2=cy+r*Math.sin(a2);
    return {...d,d:`M${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 ${sweep>180?1:0},1 ${x2.toFixed(1)},${y2.toFixed(1)}`};
  });
  return (
    <svg width="140" height="140" viewBox="0 0 140 140">
      {arcs.map((a,i)=><path key={i} d={a.d} fill="none" stroke={a.color} strokeWidth="16" strokeLinecap="butt"/>)}
      <text x="70" y="65" textAnchor="middle" fill={T.text} fontSize="12" fontWeight="600">Tech</text>
      <text x="70" y="82" textAnchor="middle" fill={T.red} fontSize="13" fontWeight="700">72%</text>
    </svg>
  );
}

// ─── SCREEN: POSITIONS ──────────────────────────────────────────────────────

function PositionsScreen({ nav }) {
  const holdings = [
    {ticker:'AMD',price:102.40,chg:-1.73,earning:'Jun 20',alert:'down'},
    {ticker:'META',price:624.15,chg:+0.82,earning:null,alert:null},
    {ticker:'MSFT',price:458.30,chg:+0.21,earning:'Jul 23',alert:null},
    {ticker:'INTC',price:19.82,chg:-2.11,earning:'Jun 26',alert:'down'},
    {ticker:'TSLA',price:162.40,chg:-1.05,earning:null,alert:'watch'},
    {ticker:'AAPL',price:213.55,chg:+0.44,earning:'Jul 30',alert:null},
    {ticker:'SPY',price:594.20,chg:+0.18,earning:null,alert:null},
  ];
  return (
    <div style={{paddingBottom:70}}>
      <div style={{padding:'14px 16px 6px'}}>
        <div style={{fontSize:11,color:T.textSec}}>Self-Directed-Ret (...1446)</div>
        <div style={{fontSize:10,color:T.textSec,marginTop:1}}>As of 09:32 AM ET Jun 03, 2026</div>
      </div>
      <div style={{display:'flex',gap:6,padding:'0 14px 10px',overflowX:'auto'}}>
        {['Performance','Asset Classes','Balances','Cash & Sweep'].map(t=>(
          <span key={t} style={{padding:'5px 12px',borderRadius:20,background:'rgba(255,255,255,0.06)',
            color:T.textSec,fontSize:10,whiteSpace:'nowrap',flexShrink:0}}>{t}</span>
        ))}
      </div>
      <Card style={{margin:'0 14px 10px'}}>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}>
          <div>
            <div style={{color:T.textSec,fontSize:10}}>Account value</div>
            <div style={{color:T.text,fontSize:22,fontWeight:700,marginTop:2}}>$418,520.40</div>
          </div>
          <Badge type="existing"/>
        </div>
        <Row label="Day's gain/loss" value="−$1,240.50 (−0.30%)" color={T.red}/>
        <Row label="Total gain/loss" value="+$51,820.70 (+14.1%)" color={T.green}/>
        <Row label="Cash & sweep funds" value="−$9,200.00" color={T.red}/>
      </Card>

      {/* F7 earnings alert — only new element on this page, kept subtle */}
      <div style={{margin:'0 14px 10px',display:'flex',alignItems:'center',gap:8,
        padding:'8px 12px',background:'rgba(245,158,11,0.08)',borderRadius:8,
        border:'1px solid rgba(245,158,11,0.2)'}}>
        <span style={{fontSize:14}}>📅</span>
        <span style={{color:T.amber,fontSize:11,flex:1}}>3 holdings have upcoming earnings</span>
        <Badge type="new" code="F7"/>
      </div>

      <div style={{margin:'0 14px'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr auto auto',gap:8,
          padding:'8px 0 6px',borderBottom:`1px solid ${T.border}`,marginBottom:2}}>
          {['SECURITY','PRICE','DESCRIPTION'].map(h=>(
            <span key={h} style={{color:T.textSec,fontSize:9,fontWeight:700}}>{h}</span>
          ))}
        </div>
        {holdings.map(h=>(
          <div key={h.ticker}
            onClick={()=>h.ticker==='AMD'&&nav('positionAMD')}
            style={{display:'flex',alignItems:'center',padding:'10px 0',
              borderBottom:`1px solid ${T.border}`,cursor:h.ticker==='AMD'?'pointer':'default'}}>
            <div style={{width:32,height:32,borderRadius:8,background:T.surface,
              display:'flex',alignItems:'center',justifyContent:'center',
              color:T.blueLight,fontSize:9,fontWeight:700,marginRight:10,flexShrink:0}}>
              {h.ticker.substring(0,2)}
            </div>
            <div style={{flex:1}}>
              <div style={{display:'flex',alignItems:'center',gap:5}}>
                <span style={{color:T.text,fontSize:12,fontWeight:600}}>{h.ticker}</span>
                {h.earning&&<span style={{width:6,height:6,borderRadius:'50%',
                  background:T.amber,flexShrink:0}} title={`Earnings ${h.earning}`}/>}
              </div>
              <div style={{color:T.textSec,fontSize:9,marginTop:1}}>
                {h.earning?`Earnings ${h.earning}`:'ETF / No upcoming event'}
              </div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{color:T.text,fontSize:12,fontWeight:600}}>${h.price}</div>
              <div style={{color:h.chg<0?T.red:T.green,fontSize:9}}>
                {h.chg>0?'+':''}{h.chg}%
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{padding:'10px 14px',display:'flex',alignItems:'center',gap:8,justifyContent:'center'}}>
        <div style={{width:6,height:6,borderRadius:'50%',background:T.amber}}/>
        <span style={{fontSize:9,color:T.textSec}}>Amber dot = earnings within 30 days</span>
        <Badge type="new" code="F7"/>
      </div>
    </div>
  );
}

// ─── SCREEN: PERFORMANCE ────────────────────────────────────────────────────

function PerformanceScreen({ nav }) {
  const [expanded, setExpanded] = useState(false);
  const [period, setPeriod] = useState('YTD');
  return (
    <div style={{paddingBottom:70}}>
      <div style={{padding:'14px 16px 8px'}}>
        <div style={{fontSize:11,color:T.textSec}}>Self-Directed-Ret (...1446)</div>
        <div style={{fontSize:16,fontWeight:700,color:T.text}}>Performance</div>
      </div>
      <div style={{padding:'0 14px',display:'flex',flexDirection:'column',gap:11}}>

        {/* F1: AI DIGEST */}
        <div style={{background:'#091a3e',borderRadius:14,padding:'15px 16px',border:'1px solid #1a3472'}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:11}}>
            <div style={{display:'flex',alignItems:'center',gap:9}}>
              <div style={{width:30,height:30,borderRadius:9,background:'#1d4ed8',
                display:'flex',alignItems:'center',justifyContent:'center',fontSize:15}}>✦</div>
              <div>
                <div style={{color:T.text,fontSize:13,fontWeight:700}}>AI Portfolio Digest</div>
                <div style={{color:T.textSec,fontSize:10}}>YTD · Jan 1 – Jun 3, 2026</div>
              </div>
            </div>
            <Badge type="new" code="F1"/>
          </div>
          <div style={{color:'#c8d8f0',fontSize:12.5,lineHeight:1.65}}>
            Your portfolio is down{' '}
            <span style={{color:'#f87171',fontWeight:700}}>8.3% YTD</span> vs. S&P 500's{' '}
            <span style={{color:'#4ade80',fontWeight:700}}>+4.2%</span> — a gap of{' '}
            <span style={{color:'#f87171',fontWeight:700}}>12.5 pts</span>.{' '}
            {!expanded?(
              <>Tech concentration drove most of the drag.{' '}
                <span onClick={()=>setExpanded(true)} style={{color:T.blueLight,cursor:'pointer',textDecoration:'underline',textDecorationStyle:'dotted'}}>Read more</span>
              </>
            ):(
              <>AMD, INTC, and TSLA account for <span style={{color:'#f87171'}}>71% of underperformance</span>.
              AMD alone cost you <span style={{color:'#f87171'}}>$23,800</span>. META and MSFT were your
              only meaningful positive contributors. Your tech exposure is 72% vs. S&P's 28%.</>
            )}
          </div>
          <div style={{display:'flex',gap:6,marginTop:12}}>
            {['1D','1M','3M','YTD','1Y'].map(p=>(
              <Pill key={p} label={p} active={p===period} onClick={()=>setPeriod(p)}/>
            ))}
          </div>
        </div>

        {/* EXISTING: Summary */}
        <Card>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}>
            <span style={{color:T.text,fontSize:13,fontWeight:600}}>Summary (YTD)</span>
            <Badge type="existing"/>
          </div>
          <div style={{color:T.textSec,fontSize:10,marginBottom:6}}>Jan 1 – Jun 3, 2026</div>
          <Row label="Beginning market value" value="$456,366.00"/>
          <Row label="Wealth generated" value="−$37,845.60" color={T.red}/>
          <Row label="Return (cumulative)" value="−8.30%" color={T.red}/>
          <Row label="vs. S&P 500 (YTD)" value="+4.2%" color={T.green}/>
        </Card>

        {/* EXISTING: Chart */}
        <Card>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
            <span style={{color:T.text,fontSize:13,fontWeight:600}}>Cumulative returns (YTD)</span>
            <Badge type="existing"/>
          </div>
          <button style={{display:'flex',alignItems:'center',gap:5,background:'rgba(59,130,246,0.1)',
            border:'1px solid rgba(59,130,246,0.3)',borderRadius:20,padding:'4px 12px',
            color:T.blueLight,fontSize:11,cursor:'pointer',marginBottom:10}}>
            ⊕ Compare with an index
          </button>
          <svg width="100%" height="72" viewBox="0 0 320 72">
            <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={T.red} stopOpacity=".25"/><stop offset="100%" stopColor={T.red} stopOpacity="0"/>
            </linearGradient></defs>
            <polyline points="0,38 25,34 55,26 80,20 105,22 125,16 145,12 160,14 175,44 195,56 215,58 240,56 275,59 320,57"
              fill="none" stroke={T.red} strokeWidth="2" strokeLinejoin="round"/>
            <line x1="0" y1="36" x2="320" y2="36" stroke={T.muted} strokeDasharray="4,3" strokeWidth="1"/>
            <text x="6" y="33" fill={T.textSec} fontSize="9">0%</text>
            <text x="268" y="54" fill={T.red} fontSize="9" fontWeight="600">−8.3%</text>
          </svg>
          <div style={{display:'flex',justifyContent:'space-between',marginTop:4}}>
            <span style={{color:T.textSec,fontSize:9}}>Jan '26</span>
            <span style={{color:T.textSec,fontSize:9}}>Jun '26</span>
          </div>
        </Card>

        {/* F3: ATTRIBUTION PREVIEW */}
        <Card>
          <SectionHead title="What's moving your portfolio?" badge={{type:'new',code:'F3'}}
            cta="Full attribution" onCta={()=>nav('attribution')}/>
          <div style={{marginBottom:12}}>
            <div style={{color:T.textSec,fontSize:9,fontWeight:700,marginBottom:7,letterSpacing:'0.5px'}}>TOP LAGGARDS</div>
            <AttrBar label="AMD" pct={34.8} value="−34.8% · −$23.8k" color={T.red} onClick={()=>nav('attribution')}/>
            <AttrBar label="INTC" pct={28.1} value="−28.1% · −$14.2k" color={T.red}/>
            <AttrBar label="TSLA" pct={22.3} value="−22.3% · −$8.9k" color={T.red}/>
          </div>
          <div>
            <div style={{color:T.textSec,fontSize:9,fontWeight:700,marginBottom:7,letterSpacing:'0.5px'}}>TOP CONTRIBUTORS</div>
            <AttrBar label="META" pct={18.2} value="+18.2% · +$12.1k" color={T.green}/>
            <AttrBar label="MSFT" pct={7.1} value="+7.1% · +$4.2k" color={T.green}/>
          </div>
          <button onClick={()=>nav('attribution')} style={{marginTop:10,width:'100%',padding:'10px',
            borderRadius:8,cursor:'pointer',background:'rgba(59,130,246,0.08)',
            border:'1px solid rgba(59,130,246,0.25)',color:T.blueLight,fontSize:12,fontWeight:600}}>
            See full attribution + AI explanations →
          </button>
        </Card>

        {/* F2: EVENT TIMELINE */}
        <Card>
          <SectionHead title="Events that moved your portfolio" badge={{type:'new',code:'F2'}}/>
          {[
            {date:'Feb 19',icon:'📉',text:'INTC: Guidance cut + 15K layoffs',delta:-2.1,t:'INTC'},
            {date:'Feb 3', icon:'⚠️',text:'TSLA: Recall of 220K vehicles',    delta:-1.8,t:'TSLA'},
            {date:'Jan 28',icon:'🚀',text:'META: Revenue beat by 14%',         delta:+1.4,t:'META'},
            {date:'Jan 15',icon:'📉',text:'AMD: Q3 earnings miss + guidance cut',delta:-3.2,t:'AMD'},
          ].map(e=>(
            <div key={e.date} style={{display:'flex',gap:10,paddingBottom:10,marginBottom:10,borderBottom:`1px solid ${T.border}`}}>
              <div style={{color:T.textSec,fontSize:10,width:38,paddingTop:1,flexShrink:0}}>{e.date}</div>
              <div style={{fontSize:15,flexShrink:0}}>{e.icon}</div>
              <div style={{flex:1}}>
                <div style={{color:T.text,fontSize:11}}>{e.text}</div>
                <div style={{color:e.delta<0?T.red:T.green,fontSize:10,marginTop:2}}>
                  Portfolio {e.delta>0?'+':''}{e.delta}% that day
                </div>
              </div>
              <span style={{padding:'2px 6px',borderRadius:4,fontSize:9,fontWeight:700,alignSelf:'center',
                background:e.delta<0?'rgba(239,68,68,0.12)':'rgba(34,197,94,0.12)',
                color:e.delta<0?T.red:T.green}}>{e.t}</span>
            </div>
          ))}
        </Card>

        {/* F5: THEME VIEW */}
        <Card>
          <SectionHead title="Theme capture" badge={{type:'new',code:'F5'}}/>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
            {[
              {name:'AI & Semis',ret:-18.4,held:true},
              {name:'Big Tech',ret:+8.2,held:true},
              {name:'Clean Energy',ret:+14.1,held:false},
              {name:'Defense',ret:+22.3,held:false},
            ].map(th=>(
              <div key={th.name} style={{padding:'9px 10px',borderRadius:9,
                background:th.held?(th.ret<0?'rgba(239,68,68,0.08)':'rgba(34,197,94,0.08)'):'rgba(255,255,255,0.04)',
                border:`1px solid ${th.held?(th.ret<0?'rgba(239,68,68,0.25)':'rgba(34,197,94,0.25)'):T.border}`}}>
                <div style={{color:T.text,fontSize:10,fontWeight:600}}>{th.name}</div>
                <div style={{color:th.ret<0?T.red:T.green,fontSize:13,fontWeight:700,margin:'3px 0'}}>
                  {th.ret>0?'+':''}{th.ret}%
                </div>
                <div style={{color:T.textSec,fontSize:9}}>{th.held?'In your portfolio':'⊕ Not held'}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* EXISTING: Returns by timeframe */}
        <Card>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}>
            <span style={{color:T.text,fontSize:13,fontWeight:600}}>Returns by timeframe</span>
            <Badge type="existing"/>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:4,marginBottom:8}}>
            {['Account','YTD','1 month','3 month'].map(h=>(
              <span key={h} style={{color:T.textSec,fontSize:9,fontWeight:700}}>{h}</span>
            ))}
          </div>
          {[['...1446','−8.30%','−5.35%','−11.2%'],['...3044','−0.83%','−1.44%','−0.60%']].map(([a,...vals])=>(
            <div key={a} style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:4,padding:'7px 0',borderBottom:`1px solid ${T.border}`}}>
              <span style={{color:T.text,fontSize:10}}>{a}</span>
              {vals.map((v,i)=><span key={i} style={{color:T.red,fontSize:10,fontWeight:600}}>{v}</span>)}
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ─── SCREEN: ATTRIBUTION ────────────────────────────────────────────────────

function AttributionScreen({ goBack, nav }) {
  const stocks = [
    {t:'AMD', pct:-34.8,impact:-23800,why:"AMD fell 34.8% as NVIDIA captured AI accelerator market share. Two consecutive earnings guidance cuts and inventory corrections in the PC/gaming segment drove the decline. Consensus price target cut from $195 → $130."},
    {t:'INTC',pct:-28.1,impact:-14200,why:"Intel dropped 28.1% following mass layoffs and a cut to its next-gen chip roadmap, signalling sustained competitive loss to both AMD and ARM-based silicon."},
    {t:'TSLA',pct:-22.3,impact:-8900, why:"Tesla declined 22.3% on large recalls, margin compression from price wars, and slowing US EV adoption. Two analyst downgrades followed the Q2 delivery miss."},
    {t:'AAPL',pct:-3.2, impact:-1800, why:"Apple fell modestly on softer iPhone 17 pre-order data and a muted Vision Pro upgrade cycle, partially offset by services revenue growth."},
    {t:'MSFT',pct:+7.1, impact:+4200, why:"Microsoft gained on Azure AI revenue growth beating estimates, with Copilot enterprise seat additions accelerating in the quarter."},
    {t:'META',pct:+18.2,impact:+12100,why:"Meta surged 18.2% on two consecutive earnings beats powered by ad revenue recovery and Llama AI adoption across enterprise clients."},
  ];
  return (
    <div style={{paddingBottom:70}}>
      <BackBtn onBack={goBack} title="Portfolio Attribution"/>
      <div style={{padding:'0 14px 6px',display:'flex',gap:8,alignItems:'center'}}>
        <Badge type="new" code="F3"/>
        <span style={{color:T.textSec,fontSize:11}}>YTD contribution by position</span>
      </div>
      <div style={{padding:'0 14px',display:'flex',flexDirection:'column',gap:11}}>
        <Card>
          <div style={{color:T.text,fontSize:13,fontWeight:600,marginBottom:14}}>Net portfolio impact — YTD</div>
          {stocks.map(s=>(
            <div key={s.t} style={{marginBottom:11}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:3}}>
                <span style={{color:T.text,fontSize:11,fontWeight:600}}>{s.t}</span>
                <span style={{color:s.impact<0?T.red:T.green,fontSize:11,fontWeight:600}}>
                  {s.impact<0?'−':'+'}${Math.abs(s.impact/1000).toFixed(1)}k
                </span>
              </div>
              <div style={{height:6,background:T.muted,borderRadius:3,overflow:'hidden'}}>
                <div style={{height:'100%',
                  width:`${Math.min(Math.abs(s.impact)/250,100)}%`,
                  background:s.impact<0?T.red:T.green,borderRadius:3}}/>
              </div>
              <div style={{color:s.pct<0?T.red:T.green,fontSize:9,marginTop:2}}>
                {s.pct>0?'+':''}{s.pct}% return on position
              </div>
            </div>
          ))}
        </Card>

        <div style={{display:'flex',gap:8,alignItems:'center',padding:'2px 0'}}>
          <Badge type="new" code="F4"/>
          <span style={{color:T.textSec,fontSize:11}}>AI explanation per position</span>
        </div>

        {stocks.map(s=>(
          <Card key={s.t} onClick={s.t==='AMD'?()=>nav('positionAMD'):undefined}
            style={{cursor:s.t==='AMD'?'pointer':'default'}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:9}}>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <div style={{width:30,height:30,borderRadius:8,background:T.surface,
                  display:'flex',alignItems:'center',justifyContent:'center',
                  color:s.impact<0?T.red:T.green,fontSize:9,fontWeight:700}}>
                  {s.t.substring(0,2)}
                </div>
                <div>
                  <div style={{color:T.text,fontSize:13,fontWeight:700}}>{s.t}</div>
                  <span style={{color:s.pct<0?T.red:T.green,fontSize:10,fontWeight:600}}>
                    {s.pct>0?'+':''}{s.pct}%
                  </span>
                </div>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{color:s.impact<0?T.red:T.green,fontSize:13,fontWeight:700}}>
                  {s.impact<0?'−':'+'}${Math.abs(s.impact/1000).toFixed(1)}k
                </div>
                {s.t==='AMD'&&<div style={{color:T.blueLight,fontSize:9,marginTop:2}}>Tap for detail →</div>}
              </div>
            </div>
            <div style={{background:'rgba(59,130,246,0.06)',borderRadius:8,padding:'9px 11px',
              border:'1px solid rgba(59,130,246,0.15)'}}>
              <div style={{display:'flex',alignItems:'flex-start',gap:6}}>
                <span style={{fontSize:11,color:T.teal,marginTop:1,flexShrink:0}}>✦</span>
                <span style={{color:'#c0d4f0',fontSize:11,lineHeight:1.65}}>{s.why}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── SCREEN: POSITION DETAIL (AMD) ──────────────────────────────────────────

function PositionDetailScreen({ goBack, nav }) {
  const [sentTab, setSentTab] = useState('recent');
  return (
    <div style={{paddingBottom:70}}>
      <BackBtn onBack={goBack} title="AMD — Position Detail"/>
      <div style={{padding:'0 14px',display:'flex',flexDirection:'column',gap:11}}>

        {/* EXISTING: Price */}
        <Card>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12}}>
            <div>
              <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4}}>
                <span style={{color:T.text,fontSize:18,fontWeight:700}}>AMD</span>
                <Badge type="existing"/>
              </div>
              <div style={{color:T.textSec,fontSize:11}}>Advanced Micro Devices</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{color:T.text,fontSize:20,fontWeight:700}}>$102.40</div>
              <div style={{color:T.red,fontSize:11}}>−$1.80 (−1.73%) today</div>
            </div>
          </div>
          <Row label="Shares" value="280"/>
          <Row label="Market value" value="$28,672"/>
          <Row label="Cost basis" value="$157.20 / share"/>
          <Row label="Total gain / loss" value="−$15,344 (−34.8%)" color={T.red}/>
          <Row label="Holding period" value="8 months (STCG)" color={T.amber}/>
        </Card>

        {/* F7: EARNINGS FLAG */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',
          padding:'10px 14px',borderRadius:10,
          background:'rgba(245,158,11,0.1)',border:'1px solid rgba(245,158,11,0.3)'}}>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <span style={{fontSize:18}}>📅</span>
            <div>
              <div style={{color:T.amber,fontSize:12,fontWeight:700}}>Earnings: Jun 20, 2026</div>
              <div style={{color:T.textSec,fontSize:10}}>16 days away · Analyst est: EPS $0.58</div>
            </div>
          </div>
          <Badge type="new" code="F7"/>
        </div>

        {/* F4: AI WHY TEXT */}
        <Card style={{background:'#091a3e',border:'1px solid #1a3472'}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}>
            <div style={{display:'flex',alignItems:'center',gap:7}}>
              <span style={{fontSize:15,color:T.teal}}>✦</span>
              <span style={{color:T.text,fontSize:13,fontWeight:600}}>Why AMD moved</span>
            </div>
            <Badge type="new" code="F4"/>
          </div>
          <div style={{color:'#c0d4f0',fontSize:12,lineHeight:1.7,marginBottom:12}}>
            AMD fell 34.8% as NVIDIA captured AI accelerator market share in data centre GPU deployments.
            Two consecutive earnings guidance cuts and inventory corrections in the PC/gaming segment
            accelerated the decline. Analysts now project a prolonged recovery — consensus price target
            has dropped from $195 to $130.
          </div>
          <div style={{display:'flex',gap:8}}>
            <button style={{flex:1,padding:'7px',borderRadius:7,border:'1px solid rgba(255,255,255,0.1)',
              background:'rgba(255,255,255,0.05)',color:T.textSec,fontSize:11,cursor:'pointer'}}>👍 Helpful</button>
            <button style={{flex:1,padding:'7px',borderRadius:7,border:'1px solid rgba(255,255,255,0.1)',
              background:'rgba(255,255,255,0.05)',color:T.textSec,fontSize:11,cursor:'pointer'}}>👎 Not helpful</button>
          </div>
        </Card>

        {/* F10: NEWS SENTIMENT */}
        <Card>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}>
            <span style={{color:T.text,fontSize:13,fontWeight:600}}>News sentiment</span>
            <Badge type="new" code="F10"/>
          </div>
          <div style={{display:'flex',gap:6,marginBottom:12}}>
            <Pill label="Recent articles" active={sentTab==='recent'} onClick={()=>setSentTab('recent')}/>
            <Pill label="2-week trend" active={sentTab==='trend'} onClick={()=>setSentTab('trend')}/>
          </div>
          {sentTab==='recent'?(
            <div style={{display:'flex',flexDirection:'column',gap:7}}>
              {[
                {text:'AMD loses hyperscaler GPU contract to NVIDIA',  s:'neg',src:'Reuters'},
                {text:'AMD Ryzen AI laptops see strong enterprise uptake',s:'pos',src:'Bloomberg'},
                {text:'Barclays downgrades AMD on data centre outlook',  s:'neg',src:'Barclays'},
                {text:'AMD MI300X performance praised at SC24',          s:'pos',src:'TechCrunch'},
              ].map((n,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:8,padding:'7px 10px',borderRadius:7,
                  background:n.s==='neg'?'rgba(239,68,68,0.07)':'rgba(34,197,94,0.07)',
                  border:`1px solid ${n.s==='neg'?'rgba(239,68,68,0.2)':'rgba(34,197,94,0.2)'}`}}>
                  <span style={{fontSize:12}}>{n.s==='neg'?'🔴':'🟢'}</span>
                  <div style={{flex:1}}>
                    <div style={{color:T.text,fontSize:11}}>{n.text}</div>
                    <div style={{color:T.textSec,fontSize:9,marginTop:1}}>{n.src}</div>
                  </div>
                </div>
              ))}
            </div>
          ):(
            <div>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                <span style={{color:T.textSec,fontSize:11}}>Rolling 14-day score</span>
                <span style={{color:T.red,fontSize:12,fontWeight:700}}>−0.62 (Bearish)</span>
              </div>
              <div style={{height:5,background:T.muted,borderRadius:3,overflow:'hidden',marginBottom:4}}>
                <div style={{height:'100%',width:'22%',background:T.green,borderRadius:3}}/>
              </div>
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <span style={{color:T.green,fontSize:9}}>Bullish ←</span>
                <span style={{color:T.red,fontSize:9}}>→ Bearish ◀</span>
              </div>
            </div>
          )}
        </Card>

        {/* F12: TAX PREDICTOR */}
        <Card>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:12}}>
            <span style={{color:T.text,fontSize:13,fontWeight:600}}>Tax impact</span>
            <Badge type="new" code="F12"/>
          </div>
          <div style={{display:'flex',gap:8,marginBottom:12}}>
            {[
              {label:'Sell now (STCG)',benefit:'$5,370',note:'Tax benefit at 35%',color:T.red},
              {label:'Hold 4 mo (LTCG)',benefit:'$7,672',note:'Extra $2,302 savings',color:T.green},
            ].map(opt=>(
              <div key={opt.label} style={{flex:1,padding:'10px',borderRadius:9,textAlign:'center',
                background:`${opt.color}14`,border:`1px solid ${opt.color}40`}}>
                <div style={{color:T.textSec,fontSize:9,marginBottom:4}}>{opt.label}</div>
                <div style={{color:T.green,fontSize:16,fontWeight:700}}>{opt.benefit}</div>
                <div style={{color:T.textSec,fontSize:9,marginTop:3}}>{opt.note}</div>
              </div>
            ))}
          </div>
          <div style={{display:'flex',alignItems:'flex-start',gap:7,padding:'9px 11px',borderRadius:8,
            background:'rgba(167,139,250,0.08)',border:'1px solid rgba(167,139,250,0.2)'}}>
            <span style={{fontSize:13,color:T.purple,flexShrink:0}}>✦</span>
            <span style={{color:'#c8b8f8',fontSize:11,lineHeight:1.6}}>
              Waiting 4 months for LTCG saves an extra <strong>$2,302</strong> vs. selling now — but carries market risk on AMD recovering further.
            </span>
          </div>
        </Card>

        {/* F6: PEER DISCOVERY */}
        <Card>
          <SectionHead title="Peers that outperformed AMD" badge={{type:'new',code:'F6'}}/>
          {[
            {t:'NVDA',ret:+42.3,desc:'Dominant AI accelerator — replaced AMD in hyperscaler deployments',icon:'🚀'},
            {t:'AVGO',ret:+28.1,desc:'Custom silicon for hyperscalers, less commoditised GPU exposure',icon:'📈'},
            {t:'MU',  ret:-12.4,desc:'Similar memory market headwinds — comparable downside profile',icon:'⚠️'},
          ].map(p=>(
            <div key={p.t} style={{display:'flex',gap:10,padding:'9px 0',borderBottom:`1px solid ${T.border}`}}>
              <div style={{fontSize:18}}>{p.icon}</div>
              <div style={{flex:1}}>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                  <span style={{color:T.text,fontSize:12,fontWeight:700}}>{p.t}</span>
                  <span style={{color:p.ret<0?T.red:T.green,fontSize:12,fontWeight:700}}>
                    {p.ret>0?'+':''}{p.ret}%
                  </span>
                </div>
                <div style={{color:T.textSec,fontSize:10,marginTop:2}}>{p.desc}</div>
              </div>
            </div>
          ))}
          <button style={{marginTop:10,width:'100%',padding:'8px',borderRadius:8,cursor:'pointer',
            background:'rgba(34,197,94,0.08)',border:'1px solid rgba(34,197,94,0.25)',
            color:'#4ade80',fontSize:11,fontWeight:600}}>
            + Add NVDA to Watchlist
          </button>
        </Card>

        {/* F8: ALLOCATION LINK */}
        <Card onClick={()=>nav('allocation')}
          style={{cursor:'pointer',background:'rgba(99,102,241,0.08)',border:'1px solid rgba(99,102,241,0.25)'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>
              <div style={{display:'flex',alignItems:'center',gap:7,marginBottom:4}}>
                <span style={{color:T.purple,fontSize:13,fontWeight:600}}>View allocation + Rebalance</span>
                <Badge type="new" code="F8"/>
              </div>
              <div style={{color:T.textSec,fontSize:11}}>Your tech exposure is 72% — vs. S&P's 28%</div>
            </div>
            <span style={{color:T.purple,fontSize:22}}>›</span>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── SCREEN: ALLOCATION + REBALANCE ─────────────────────────────────────────

function AllocationScreen({ goBack }) {
  const [rebalOpen, setRebalOpen] = useState(false);
  const donutLegend = [
    {label:'Tech stocks',pct:72,color:T.red},
    {label:'ETFs (SPY/QQQ)',pct:12,color:T.blue},
    {label:'Consumer',pct:7,color:T.amber},
    {label:'Healthcare',pct:5,color:T.green},
    {label:'Cash/MMF',pct:4,color:'#64748b'},
  ];
  return (
    <div style={{paddingBottom:70}}>
      <BackBtn onBack={goBack} title="Allocation & Rebalance"/>
      <div style={{padding:'0 14px',display:'flex',flexDirection:'column',gap:11}}>

        {/* F8: ALLOCATION VIEW */}
        <Card>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:14}}>
            <span style={{color:T.text,fontSize:13,fontWeight:600}}>True exposure</span>
            <Badge type="new" code="F8"/>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:16}}>
            <DonutChart/>
            <div style={{flex:1}}>
              {donutLegend.map(d=>(
                <div key={d.label} style={{display:'flex',alignItems:'center',gap:6,marginBottom:7}}>
                  <div style={{width:8,height:8,borderRadius:2,background:d.color,flexShrink:0}}/>
                  <span style={{color:T.textSec,fontSize:11,flex:1}}>{d.label}</span>
                  <span style={{color:T.text,fontSize:11,fontWeight:600}}>{d.pct}%</span>
                  {d.label==='Tech stocks'&&<span style={{color:T.red,fontSize:9,
                    background:'rgba(239,68,68,0.15)',padding:'1px 4px',borderRadius:3}}>⚠ High</span>}
                </div>
              ))}
            </div>
          </div>
          <div style={{marginTop:14,padding:'10px 12px',borderRadius:8,
            background:'rgba(239,68,68,0.08)',border:'1px solid rgba(239,68,68,0.25)'}}>
            <div style={{color:T.red,fontSize:12,fontWeight:600,marginBottom:3}}>Tech overconcentration alert</div>
            <div style={{color:T.textSec,fontSize:11}}>
              72% in tech vs. S&P 500 benchmark of 28%. Your top 3 positions represent 37% of total portfolio.
            </div>
          </div>
        </Card>

        {/* ETF Look-through */}
        <Card>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}>
            <span style={{color:T.text,fontSize:13,fontWeight:600}}>ETF look-through</span>
            <Badge type="new" code="F8"/>
          </div>
          <div style={{color:T.textSec,fontSize:11,marginBottom:10}}>
            SPY contributes ~26% hidden tech exposure within its NAV.
          </div>
          <Row label="Direct tech holdings" value="72%" color={T.red}/>
          <Row label="SPY tech look-through" value="+3.1%" color={T.amber}/>
          <Row label="True combined tech exposure" value="75.1%" color={T.red}/>
        </Card>

        {/* F9: REBALANCE */}
        <Card style={{background:'#091a3e',border:'1px solid #1a3472'}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:12}}>
            <span style={{color:T.text,fontSize:13,fontWeight:600}}>Rebalance portfolio</span>
            <Badge type="new" code="F9"/>
          </div>
          <div style={{color:T.textSec,fontSize:11,marginBottom:12}}>Target vs. current allocation:</div>
          {[
            {label:'Tech stocks',    curr:72,target:40,color:T.red},
            {label:'ETFs',           curr:12,target:25,color:T.blue},
            {label:'Other sectors',  curr:12,target:25,color:T.green},
            {label:'Cash/MMF',       curr:4, target:10,color:'#64748b'},
          ].map(r=>(
            <div key={r.label} style={{marginBottom:11}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
                <span style={{color:T.text,fontSize:11}}>{r.label}</span>
                <span style={{color:T.textSec,fontSize:10}}>
                  <span style={{color:T.red}}>{r.curr}%</span>
                  {' → '}
                  <span style={{color:T.green}}>{r.target}%</span>
                </span>
              </div>
              <div style={{height:6,background:T.muted,borderRadius:3,position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',height:'100%',width:`${r.curr}%`,
                  background:r.color,opacity:0.35,borderRadius:3}}/>
                <div style={{position:'absolute',height:'100%',width:`${r.target}%`,
                  background:r.color,borderRadius:3,opacity:0.85}}/>
              </div>
            </div>
          ))}

          {!rebalOpen?(
            <button onClick={()=>setRebalOpen(true)} style={{marginTop:6,width:'100%',padding:'12px',
              borderRadius:9,cursor:'pointer',background:'#1d4ed8',border:'none',
              color:'white',fontSize:13,fontWeight:700}}>
              Generate rebalance plan →
            </button>
          ):(
            <div style={{marginTop:10,padding:'12px',borderRadius:9,background:'rgba(255,255,255,0.05)',
              border:`1px solid ${T.border}`}}>
              <div style={{color:T.text,fontSize:12,fontWeight:600,marginBottom:9}}>Suggested trades</div>
              {[
                {action:'SELL',t:'AMD', qty:'280 sh',v:'$28,672',reason:'Reduce tech overweight'},
                {action:'SELL',t:'INTC',qty:'400 sh',v:'$7,928', reason:'Remove underperformer'},
                {action:'BUY', t:'SPY', qty:'60 sh', v:'$35,652',reason:'Increase index exposure'},
                {action:'BUY', t:'SCHD',qty:'120 sh',v:'$9,800', reason:'Add defensive dividend'},
              ].map(tr=>(
                <div key={tr.t} style={{display:'flex',gap:8,padding:'7px 0',borderBottom:`1px solid ${T.border}`}}>
                  <span style={{color:tr.action==='SELL'?T.red:T.green,fontSize:10,fontWeight:700,width:28,flexShrink:0}}>{tr.action}</span>
                  <span style={{color:T.text,fontSize:11,fontWeight:600,width:36}}>{tr.t}</span>
                  <span style={{color:T.textSec,fontSize:10,flex:1}}>{tr.reason}</span>
                  <span style={{color:T.text,fontSize:10,fontWeight:600}}>{tr.v}</span>
                </div>
              ))}
              <button style={{marginTop:10,width:'100%',padding:'10px',borderRadius:8,cursor:'pointer',
                background:'rgba(34,197,94,0.15)',border:'1px solid rgba(34,197,94,0.35)',
                color:T.green,fontSize:12,fontWeight:700}}>
                Review & place orders
              </button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

// ─── AI CHAT OVERLAY ────────────────────────────────────────────────────────

function AIChatOverlay({ onClose }) {
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState([
    {role:'ai',text:"Hi Michael! I can see your portfolio is down 8.3% YTD against S&P's +4.2%. What would you like to understand?"},
  ]);
  const suggested = [
    "Why is my portfolio underperforming the S&P?",
    "Should I sell AMD now or wait?",
    "How do I reduce my tech exposure?",
  ];
  const answers = {
    "Why is my portfolio underperforming the S&P?":
      "Your portfolio trails the S&P by 12.5 pts YTD. AMD, INTC, and TSLA — representing 37% of your portfolio — have averaged −28.4% vs. the index's +4.2%. Your ETF positions (SPY, QQQ) partially cushioned losses, but single-stock tech concentration is the primary driver of underperformance.",
    "Should I sell AMD now or wait?":
      "AMD is down 34.8% from your cost of $157.20. Selling now generates a $5,370 tax benefit via short-term capital loss. Holding 4 more months until LTCG treatment saves an additional $2,302 — but exposes you to earnings risk on Jun 20. With consensus price target at $130 (roughly flat from here), the tax benefit of harvesting now may outweigh the wait.",
    "How do I reduce my tech exposure?":
      "You're 72% in tech vs. S&P's 28%. To reach a more balanced 40%, you'd need to sell ~$134K in tech positions and redeploy into diversified ETFs or defensive sectors. Starting with your highest-loss positions (AMD, INTC) lets you harvest tax losses simultaneously. I'd suggest SPY, XLV (healthcare), or XLE (energy) as redeployment targets.",
  };
  const send = (text) => {
    const q = text||input;
    if(!q.trim())return;
    const reply = answers[q]||"Let me look at your portfolio data. Could you be more specific about what aspect you'd like to explore — performance, risk, or a specific position?";
    setMsgs(prev=>[...prev,{role:'user',text:q},{role:'ai',text:reply}]);
    setInput('');
  };
  return (
    <div style={{position:'absolute',inset:0,background:T.bg,zIndex:100,display:'flex',flexDirection:'column'}}>
      <div style={{padding:'14px 16px',display:'flex',justifyContent:'space-between',alignItems:'center',
        borderBottom:`1px solid ${T.border}`,flexShrink:0}}>
        <div style={{display:'flex',alignItems:'center',gap:9}}>
          <div style={{width:30,height:30,borderRadius:9,background:'#1d4ed8',
            display:'flex',alignItems:'center',justifyContent:'center',fontSize:15}}>✦</div>
          <div>
            <div style={{color:T.text,fontSize:13,fontWeight:700}}>Portfolio AI</div>
            <div style={{color:T.textSec,fontSize:10}}>Grounded in your real positions</div>
          </div>
          <Badge type="new" code="F11"/>
        </div>
        <button onClick={onClose} style={{background:'none',border:'none',color:T.textSec,cursor:'pointer',fontSize:20}}>✕</button>
      </div>
      <div style={{flex:1,overflowY:'auto',padding:'14px'}}>
        {msgs.map((m,i)=>(
          <div key={i} style={{marginBottom:12,display:'flex',justifyContent:m.role==='user'?'flex-end':'flex-start'}}>
            <div style={{maxWidth:'85%',padding:'10px 13px',lineHeight:1.65,fontSize:12,color:T.text,
              borderRadius:m.role==='user'?'12px 12px 4px 12px':'12px 12px 12px 4px',
              background:m.role==='user'?T.blue:T.card,
              border:m.role==='ai'?`1px solid ${T.border}`:'none'}}>
              {m.text}
            </div>
          </div>
        ))}
        {msgs.length===1&&(
          <div style={{marginTop:8}}>
            <div style={{color:T.textSec,fontSize:10,marginBottom:8,fontWeight:700,letterSpacing:'0.4px'}}>SUGGESTED QUESTIONS</div>
            {suggested.map(q=>(
              <button key={q} onClick={()=>send(q)} style={{display:'block',width:'100%',textAlign:'left',
                marginBottom:7,padding:'9px 12px',borderRadius:8,cursor:'pointer',
                background:'rgba(59,130,246,0.08)',border:'1px solid rgba(59,130,246,0.25)',
                color:T.blueLight,fontSize:11}}>{q}</button>
            ))}
          </div>
        )}
      </div>
      <div style={{padding:'10px 14px',borderTop:`1px solid ${T.border}`,display:'flex',gap:8,flexShrink:0}}>
        <input value={input} onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>e.key==='Enter'&&send()}
          placeholder="Ask about your portfolio…"
          style={{flex:1,padding:'10px 12px',borderRadius:8,background:T.card,
            border:`1px solid ${T.border}`,color:T.text,fontSize:12,outline:'none'}}/>
        <button onClick={()=>send()} style={{padding:'0 14px',borderRadius:8,background:T.blue,
          border:'none',color:'white',cursor:'pointer',fontSize:18}}>↑</button>
      </div>
    </div>
  );
}

// ─── LEFT PANEL: JOURNEY GUIDE ───────────────────────────────────────────────

function JourneyGuide({ screen, sub }) {
  const active = sub==='attribution'?1:sub==='positionAMD'||sub==='allocation'?2:0;
  const steps = [
    {q:'❓ What happened?',color:'#3b82f6',
      note:"Michael opens app and immediately sees the 'so what' — portfolio down 8.3%, lagging S&P by 12.5pts.",
      features:['F1: AI Digest','Existing: Summary','Existing: Charts','F5: Theme capture','F2: Event timeline','F3: Attribution preview']},
    {q:'🔍 Why did it move?',color:'#f59e0b',
      note:"Michael drills into attribution. AMD, INTC, TSLA are the culprits. AI tells him exactly why each moved.",
      features:['F3: Full attribution','F4: AI Why Text per stock']},
    {q:'🎯 What do I do?',color:'#22c55e',
      note:"Michael gets actionable insights: harvest AMD loss, watch earnings, rebalance tech, explore NVDA.",
      features:['F7: Earnings flag','F4: AI Why','F10: News sentiment','F12: Tax predictor','F6: Peer discovery','F8: Allocation view','F9: Rebalance','F11: AI Chat']},
  ];
  return (
    <div style={{fontFamily:'system-ui,sans-serif'}}>
      <div style={{marginBottom:16}}>
        <div style={{fontSize:11,fontWeight:700,color:'#1e293b',textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:4}}>
          Michael's journey
        </div>
        <div style={{fontSize:10,color:'#64748b',lineHeight:1.5}}>
          Frustrated investor · $420K account · −8.3% vs S&P +4.2%
        </div>
      </div>
      {steps.map((s,i)=>(
        <div key={i} style={{marginBottom:14,opacity:i===active?1:0.45,transition:'opacity 0.3s'}}>
          <div style={{display:'flex',alignItems:'center',gap:7,marginBottom:6}}>
            <div style={{width:20,height:20,borderRadius:'50%',background:s.color,
              display:'flex',alignItems:'center',justifyContent:'center',
              fontSize:9,fontWeight:700,color:'white',flexShrink:0}}>{i+1}</div>
            <div style={{fontSize:11,fontWeight:700,color:'#1e293b'}}>{s.q}</div>
          </div>
          <div style={{paddingLeft:27}}>
            <div style={{fontSize:10,color:'#64748b',lineHeight:1.55,marginBottom:6}}>{s.note}</div>
            <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
              {s.features.map(f=>(
                <span key={f} style={{fontSize:9,padding:'2px 6px',borderRadius:4,display:'inline-block',
                  background:f.startsWith('F')?'#eff6ff':'#f0fdf4',
                  border:`1px solid ${f.startsWith('F')?'#bfdbfe':'#bbf7d0'}`,
                  color:f.startsWith('F')?'#1d4ed8':'#15803d'}}>{f}</span>
              ))}
            </div>
          </div>
          {i<2&&<div style={{marginLeft:10,height:14,borderLeft:'2px dashed #cbd5e1',marginTop:7}}/>}
        </div>
      ))}
    </div>
  );
}

// ─── RIGHT PANEL: FEATURE LEGEND ────────────────────────────────────────────

function FeatureLegend({ screen, sub }) {
  const activeSet = new Set(
    sub==='attribution'?['F3','F4']:
    sub==='positionAMD'?['F4','F6','F7','F8','F10','F12']:
    sub==='allocation'?['F8','F9']:
    screen==='positions'?['F7']:
    ['F1','F2','F3','F5']
  );
  const all = [
    {c:'F1',name:'AI Digest',         view:'Performance'},
    {c:'F2',name:'Event Timeline',    view:'Performance'},
    {c:'F3',name:'Attribution',       view:'Performance/Detail'},
    {c:'F4',name:'AI Why Text',       view:'Attribution/Position'},
    {c:'F5',name:'Theme Capture',     view:'Performance'},
    {c:'F6',name:'Peer Discovery',    view:'Position Detail'},
    {c:'F7',name:'Earnings Flag',     view:'Positions + Detail'},
    {c:'F8',name:'Allocation View',   view:'Allocation'},
    {c:'F9',name:'Rebalance',         view:'Allocation'},
    {c:'F10',name:'News Sentiment',   view:'Position Detail'},
    {c:'F11',name:'AI Chat',          view:'Global (floating)'},
    {c:'F12',name:'Tax Predictor',    view:'Position Detail'},
  ];
  return (
    <div style={{fontFamily:'system-ui,sans-serif'}}>
      <div style={{fontSize:11,fontWeight:700,color:'#1e293b',textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:10}}>
        Feature map
      </div>
      {all.map(f=>(
        <div key={f.c} style={{marginBottom:5,padding:'5px 8px',borderRadius:6,transition:'all 0.3s',
          background:activeSet.has(f.c)?'#eff6ff':'#f8fafc',
          border:`1px solid ${activeSet.has(f.c)?'#bfdbfe':'#e2e8f0'}`,
          opacity:activeSet.has(f.c)||f.c==='F11'?1:0.5}}>
          <div style={{display:'flex',gap:5,alignItems:'center'}}>
            <span style={{fontSize:9,fontWeight:700,color:activeSet.has(f.c)?'#1d4ed8':'#94a3b8',width:22}}>{f.c}</span>
            <span style={{fontSize:10,fontWeight:600,color:activeSet.has(f.c)?'#1e293b':'#64748b',flex:1}}>{f.name}</span>
          </div>
          <div style={{fontSize:8,color:'#94a3b8',marginTop:1,paddingLeft:27}}>{f.view}</div>
        </div>
      ))}
      <div style={{marginTop:12,padding:'8px',borderRadius:7,background:'#fefce8',border:'1px solid #fde68a'}}>
        <div style={{fontSize:9,fontWeight:700,color:'#92400e',marginBottom:5}}>Legend</div>
        <div style={{display:'flex',gap:5,marginBottom:4,alignItems:'center'}}>
          <span style={{fontSize:8,background:'#eff6ff',color:'#1d4ed8',border:'1px solid #bfdbfe',padding:'1px 5px',borderRadius:3}}>✦ NEW</span>
          <span style={{fontSize:8,color:'#78716c'}}>Proposed feature</span>
        </div>
        <div style={{display:'flex',gap:5,alignItems:'center'}}>
          <span style={{fontSize:8,background:'#f0fdf4',color:'#15803d',border:'1px solid #bbf7d0',padding:'1px 5px',borderRadius:3}}>● EXISTING</span>
          <span style={{fontSize:8,color:'#78716c'}}>Current feature</span>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState('performance');
  const [sub, setSub] = useState(null);
  const [chat, setChat] = useState(false);

  const nav = (to) => { setSub(to); setChat(false); };
  const goBack = () => setSub(null);
  const goTab = (s) => { setScreen(s); setSub(null); setChat(false); };

  const stepLabel = sub==='attribution'?'Step 2 / 3 — WHY DID IT MOVE?':
    sub==='positionAMD'?'Step 3 / 3 — DEEP DIVE: AMD':
    sub==='allocation'?'Step 3 / 3 — REBALANCE':
    screen==='positions'?'Positions (clean view)':
    'Step 1 / 3 — WHAT HAPPENED?';

  return (
    <div style={{display:'flex',gap:18,padding:18,background:'#f1f5f9',minHeight:'100vh',
      fontFamily:'system-ui,-apple-system,sans-serif',alignItems:'flex-start',justifyContent:'center'}}>

      {/* LEFT */}
      <div style={{width:195,background:'white',borderRadius:14,padding:14,
        boxShadow:'0 1px 12px rgba(0,0,0,0.08)',position:'sticky',top:18}}>
        <JourneyGuide screen={screen} sub={sub}/>
      </div>

      {/* PHONE */}
      <div style={{width:390,flexShrink:0}}>
        <div style={{fontSize:10,fontWeight:700,color:'#64748b',textAlign:'center',marginBottom:8,
          letterSpacing:'0.4px',textTransform:'uppercase'}}>{stepLabel}</div>
        <div style={{background:'#1a1a2e',borderRadius:44,padding:'10px 9px',
          boxShadow:'0 20px 60px rgba(0,0,0,0.4),inset 0 0 0 1px rgba(255,255,255,0.08)'}}>
          <div style={{background:T.bg,borderRadius:36,overflow:'hidden',height:790,
            display:'flex',flexDirection:'column',position:'relative'}}>
            {/* Status bar */}
            <div style={{padding:'12px 20px 4px',display:'flex',justifyContent:'space-between',
              background:T.bg,flexShrink:0}}>
              <span style={{color:T.text,fontSize:11,fontWeight:600}}>9:41</span>
              <div style={{display:'flex',gap:5,alignItems:'center'}}>
                <span style={{color:T.text,fontSize:10}}>●●●</span>
                <span style={{color:T.text,fontSize:10}}>WiFi</span>
                <span style={{color:T.text,fontSize:10}}>■</span>
              </div>
            </div>

            {/* Screen */}
            <div style={{flex:1,overflowY:'auto',position:'relative'}}>
              {chat&&<AIChatOverlay onClose={()=>setChat(false)}/>}
              {!chat&&!sub&&screen==='performance'&&<PerformanceScreen nav={nav}/>}
              {!chat&&!sub&&screen==='positions'&&<PositionsScreen nav={nav}/>}
              {!chat&&sub==='attribution'&&<AttributionScreen goBack={goBack} nav={nav}/>}
              {!chat&&sub==='positionAMD'&&<PositionDetailScreen goBack={goBack} nav={nav}/>}
              {!chat&&sub==='allocation'&&<AllocationScreen goBack={goBack}/>}
            </div>

            {/* Floating AI chat */}
            {!chat&&(
              <button onClick={()=>setChat(true)} style={{position:'absolute',bottom:80,right:14,
                width:48,height:48,borderRadius:'50%',background:'#1d4ed8',border:'none',
                cursor:'pointer',fontSize:20,boxShadow:'0 4px 20px rgba(29,78,216,0.5)',
                display:'flex',alignItems:'center',justifyContent:'center',zIndex:40}}>✦</button>
            )}

            {/* Bottom nav */}
            {!chat&&(
              <div style={{flexShrink:0,background:T.surface,borderTop:`1px solid ${T.border}`,
                display:'flex',justifyContent:'space-around',padding:'8px 0 16px'}}>
                {[
                  {id:'overview',  label:'Overview', icon:'⊞'},
                  {id:'positions', label:'Positions',icon:'≡'},
                  {id:'performance',label:'Performance',icon:'↗'},
                  {id:'watchlist', label:'Watchlist',icon:'★'},
                  {id:'more',      label:'More',     icon:'···'},
                ].map(t=>(
                  <button key={t.id} onClick={()=>goTab(t.id)} style={{background:'none',border:'none',
                    cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:2,padding:'0 5px'}}>
                    <span style={{fontSize:14}}>{t.icon}</span>
                    <span style={{fontSize:9,color:screen===t.id&&!sub?T.blue:T.textSec,
                      fontWeight:screen===t.id&&!sub?700:400}}>{t.label}</span>
                    {screen===t.id&&!sub&&<div style={{width:14,height:2,background:T.blue,borderRadius:1}}/>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div style={{width:180,background:'white',borderRadius:14,padding:14,
        boxShadow:'0 1px 12px rgba(0,0,0,0.08)',position:'sticky',top:18}}>
        <FeatureLegend screen={screen} sub={sub}/>
      </div>
    </div>
  );
}
