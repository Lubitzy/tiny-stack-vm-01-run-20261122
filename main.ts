import*as f from'node:fs';
const{MAKEFUN_INPUT_DIR:I='/input',MAKEFUN_OUTPUT_DIR:O='/output'}=process.env;
const T=`!2b%'+,0qqqqqqqq*******&***&***q***qqqqqqqqqqqqqAEEA!qqqqqqqqqqq&)qqqqqqqqqqqqqq%%"%"`;
const F=[(a,b)=>a+b,(a,b)=>a-b,Math.imul,(a,b)=>a/b,(a,b)=>a%b,(a,b)=>(a>>>0)/(b>>>0),(a,b)=>(a>>>0)%(b>>>0),0,(a,b)=>a&b,(a,b)=>a|b,(a,b)=>a^b,0,(a,b)=>a<<b,(a,b)=>a>>b,(a,b)=>a>>>b,0,(a,b)=>a==b,(a,b)=>a<b,(a,b)=>(a>>>0)<(b>>>0)];
for(const d of f.readdirSync(I).sort()){
const p=f.readFileSync(I+'/'+d+'/program.bin'),q=f.readFileSync(I+'/'+d+'/input.bin');
let D=new Int32Array(256),s=0,C=new Int32Array(64),c=0,M=new Int32Array(256),u='',g=0,pc=0,t=0,e=0;
for(;;){
if(t==1e6){e=10;break}
if(pc>>>0>=p.length){e=9;break}
const op=p[pc],v=T.charCodeAt(op)-33;
if(op>83|v>65){e=5;break}
const m=v>>4,y=v>>2&3,z=v&3,n=pc+1+m;
if(n>p.length){e=9;break}
t++;
if(s<y||s+z>256+y){e=s<y?2:3;break}
pc=n;
if(op==0)break;
else if(op==1)D[s++]=p.readInt8(n-1);
else if(op==2)D[s++]=p.readInt32LE(n-4);
else if(op==3)s--;
else if(op==4)D[s]=D[s-1],s++
else if(op==5){const x=D[s-1];D[s-1]=D[s-2];D[s-2]=x}
else if(op==6)D[s]=D[s-2],s++
else if(op==7)[D[s-3],D[s-2],D[s-1]]=[D[s-2],D[s-1],D[s-3]];
else if(op==23)D[s-1]=-D[s-1];
else if(op==27)D[s-1]=~D[s-1];
else if(op>15&&op<35){if(op>18&op<23&&D[s-1]==0){e=4;break}D[s-2]=F[op-16](D[s-2],D[s-1]);s--}
else if(op>47&&op<52){
if(op==51){if(c==64){e=7;break}C[c++]=n;pc=p[n-2]|p[n-1]<<8}
else{const r=p.readInt16LE(n-2);if(op==48||(op==49)==!D[--s])pc=n+r}
}
else if(op==52){if(!c){e=8;break}pc=C[--c]}
else if(op==64){const a=D[s-1];if(a<0|a>255){e=6;break}D[s-1]=M[a]}
else if(op==65){const a=D[s-1];if(a<0|a>255){e=6;break}M[a]=D[s-2];s-=2}
else if(op==80){const w=D[s-1]+'';if(u.length+w.length>65536){e=11;break}s--;u+=w}
else if(op==81){if(u.length>65535){e=11;break}u+=String.fromCharCode(D[--s])}
else if(op==82)D[s++]=g<q.length?q[g++]:-1;
else if(op==83){e=D[--s]&255;break}
}
const w=O+'/'+d;f.mkdirSync(w,{recursive:true});
f.writeFileSync(w+'/stdout.bin',Buffer.from(u,'latin1'));
f.writeFileSync(w+'/exit.txt',e+'\n');
}
