import*as f from'node:fs';
const{MAKEFUN_INPUT_DIR:I='/input',MAKEFUN_OUTPUT_DIR:O='/output'}=process.env;
const T="!2b%'+,0qqqqqqqq*******&***&***q***qqqqqqqqqqqqqAEEA!qqqqqqqqqqq&)qqqqqqqqqqqqqq%%\"%";
const F=[(a,b)=>a+b|0,(a,b)=>a-b|0,(a,b)=>Math.imul(a,b),(a,b)=>a/b|0,(a,b)=>b==-1?0:a%b|0,(a,b)=>(a>>>0)/(b>>>0)|0,(a,b)=>(a>>>0)%(b>>>0)|0,0,(a,b)=>a&b,(a,b)=>a|b,(a,b)=>a^b,0,(a,b)=>a<<(b&31),(a,b)=>a>>(b&31),(a,b)=>a>>>(b&31)|0,0,(a,b)=>a==b?1:0,(a,b)=>a<b?1:0,(a,b)=>(a>>>0)<(b>>>0)?1:0];
for(const id of f.readdirSync(I).sort()){
const p=f.readFileSync(I+'/'+id+'/program.bin'),q=f.readFileSync(I+'/'+id+'/input.bin');
let D=new Int32Array(256),s=0,C=new Int32Array(64),c=0,M=new Int32Array(256),o=new Uint8Array(65536),l=0,g=0,pc=0,t=0,e=0;
for(;;){
if(t==1e6){e=10;break}
if(pc<0||pc>=p.length){e=9;break}
const op=p[pc],v=T.charCodeAt(op)-33;
if(op>83||v>65){e=5;break}
const m=v>>4,y=(v>>2)&3,z=v&3;
if(pc+m>=p.length){e=9;break}
t++;
const n=pc+1+m;
if(s<y){e=2;break}
if(s-y+z>256){e=3;break}
pc=n;
if(op==0){e=0;break}
else if(op==1)D[s++]=(p[n-1]<<24)>>24;
else if(op==2)D[s++]=p[n-4]|p[n-3]<<8|p[n-2]<<16|p[n-1]<<24;
else if(op==3)s--;
else if(op==4){D[s]=D[s-1];s++}
else if(op==5){const x=D[s-1];D[s-1]=D[s-2];D[s-2]=x}
else if(op==6){D[s]=D[s-2];s++}
else if(op==7){const a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a}
else if(op==23)D[s-1]=-D[s-1]|0;
else if(op==27)D[s-1]=~D[s-1];
else if(op>15&&op<35){const b=D[s-1],a=D[s-2];if(op>18&&op<23&&b==0){e=4;break}s-=2;D[s++]=F[op-16](a,b)}
else if(op>47&&op<52){
if(op==51){if(c==64){e=7;break}C[c++]=n;pc=p[n-2]|p[n-1]<<8}
else{const r=((p[n-2]|p[n-1]<<8)<<16)>>16;if(op==48||(op==49?D[--s]==0:D[--s]!=0))pc=n+r}
}
else if(op==52){if(c==0){e=8;break}pc=C[--c]}
else if(op==64){const a=D[s-1];if(a<0||a>255){e=6;break}D[s-1]=M[a]}
else if(op==65){const a=D[s-1],w=D[s-2];if(a<0||a>255){e=6;break}s-=2;M[a]=w}
else if(op==80){const w=String(D[s-1]);if(l+w.length>65536){e=11;break}s--;for(const k of w)o[l++]=k.charCodeAt(0)}
else if(op==81){if(l+1>65536){e=11;break}o[l++]=D[--s]&255}
else if(op==82)D[s++]=g<q.length?q[g++]:-1;
else if(op==83){e=D[--s]&255;break}
}
f.mkdirSync(O+'/'+id,{recursive:true});
f.writeFileSync(O+'/'+id+'/stdout.bin',o.slice(0,l));
f.writeFileSync(O+'/'+id+'/exit.txt',e+'\n');
}
