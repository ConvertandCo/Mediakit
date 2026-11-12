import sys,subprocess,json,re
from pocketsphinx import Decoder
name,text=sys.argv[1],open(sys.argv[2]).read()
subprocess.run(['ffmpeg','-y','-loglevel','error','-i',f'{name}_vo.wav','-ar','16000','-ac','1','-f','s16le',f'{name}.raw'],check=True)
words=re.sub(r"\[[a-z ]+\]","",text.lower());words=re.sub(r"[^a-z' ]"," ",words);words=' '.join(words.split())
d=Decoder(samprate=16000);d.set_align_text(words);d.start_utt();d.process_raw(open(f'{name}.raw','rb').read(),full_utt=True);d.end_utt()
out=[(s.word,s.start_frame/100,(s.end_frame)/100) for s in d.seg() if s.word not in ('<sil>','<s>','</s>','[NOISE]')]
json.dump(out,open(f'{name}_words.json','w'));print(name,len(out),'words');print(' '.join(f'{w}@{a:.2f}' for w,a,b in out))
