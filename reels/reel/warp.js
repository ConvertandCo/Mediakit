// retime a reel to its voiceover: piecewise-linear map of old script times -> VO times, plus absolute overrides
function WARP(A,ov={}){A.sort((a,b)=>a[0]-b[0]);const w=t=>{if(t<=A[0][0])return A[0][1]+(t-A[0][0]);for(let i=1;i<A.length;i++)if(t<=A[i][0]){const [a0,b0]=A[i-1],[a1,b1]=A[i];return b0+(t-a0)*(b1-b0)/(a1-a0);}const [a,b]=A[A.length-1];return b+(t-a);};
  for(const k in K)K[k]=Math.round(w(K[k])*1000)/1000;for(const k in ov)K[k]=ov[k];for(const c of CAP)c[0]=Math.round(w(c[0])*1000)/1000;
  S=S.map((s,i)=>i===0?0:null);}
