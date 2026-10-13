"""Translate the existing English catalogue locally with an Argos/OpenNMT model.
No website text is transmitted over the network. Model/runtime are supplied externally.
"""
import json, re, sys, time
from pathlib import Path
import ctranslate2
import sentencepiece

task = Path(sys.argv[1])
model = task / 'model/translate-en_nl-1_8'
source = json.loads((task / 'input.json').read_text(encoding='utf-8'))
destination = task / 'translated.json'
done = json.loads(destination.read_text(encoding='utf-8')) if destination.exists() else {}
sp = sentencepiece.SentencePieceProcessor(model_file=str(model / 'sentencepiece.model'))
engine = ctranslate2.Translator(str(model / 'model'), device='cpu', compute_type='int8', inter_threads=1, intra_threads=4)
brands = ['NÓMADA EXTREMO', 'Nómada Extremo', 'Horizonte Nómada', 'Escuela Nómada', 'Diego David Extremo', 'Diego David Gómez García', 'Nuria Pons', 'IES Europa', 'Nómada', 'NÓMADA', 'GMN', 'SSI', 'PADI', 'AFF', 'FPV', 'AESA', 'EASA', 'USPA', 'RFAE', 'FAMUR', 'Open Water', 'Advanced Open Water', 'Rescue Diver', 'Divemaster', 'GoPro', 'Insta360', 'DJI', 'Logbook', 'Águilas', 'Murcia', 'Cabo Cope', 'Sierra Espuña']
brand_re = re.compile('('+'|'.join(re.escape(b) for b in sorted(brands,key=len,reverse=True))+r'|<[^>]+>|\{[^}]+\})')
def chunks(text):
    # Break long paragraphs into complete sentences, keeping the model below its input limit.
    parts = re.split(r'(?<=[.!?;])\s+', text)
    output=[];current=''
    for part in parts:
        if len(current)+len(part)>700 and current: output.append(current);current=''
        if len(part)>700:
            if current: output.append(current);current=''
            words=part.split();line=''
            for word in words:
                if len(line)+len(word)>650: output.append(line);line=''
                line+=((' ' if line else '')+word)
            if line: output.append(line)
        else: current+=((' ' if current else '')+part)
    if current: output.append(current)
    return output
def passthrough(text):
    return not re.search('[A-Za-zÀ-ž]',text) or bool(re.match(r'^(?:https?://|mailto:|tel:|assets/|[\w.-]+@)',text)) or bool(re.fullmatch(r'[\w-]+\.html(?:#.*)?',text))
pending=[t for t in source['texts'] if t not in done]
start=time.time()
for offset in range(0,len(pending),48):
    batch=pending[offset:offset+48];units=[];plans=[]
    for text in batch:
        if passthrough(text): plans.append([(False,text)]);continue
        plan=[]
        for part in brand_re.split(text):
            if not part: continue
            if part in brands or passthrough(part) or re.fullmatch(r'<[^>]+>|\{[^}]+\}',part): plan.append((False,part));continue
            leading=part[:len(part)-len(part.lstrip())];trailing=part[len(part.rstrip()):]
            if leading: plan.append((False,leading))
            for index,piece in enumerate(chunks(part.strip())):
                if index: plan.append((False,' '))
                plan.append((True,len(units)));units.append(piece)
            if trailing: plan.append((False,trailing))
        plans.append(plan)
    results=engine.translate_batch([sp.encode(t.lower() if t.isupper() else t,out_type=str) for t in units], beam_size=4, max_decoding_length=512, max_batch_size=2048, batch_type='tokens', repetition_penalty=1.1) if units else []
    translated=[''.join(r.hypotheses[0]).replace('▁',' ').strip() for r in results]
    for text,plan in zip(batch,plans):
        value=''.join(translated[p] if translate else p for translate,p in plan)
        if text.isupper(): value=value.upper()
        done[text]=value or text
    destination.write_text(json.dumps(done,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(f'{min(offset+48,len(pending))}/{len(pending)} texts; {round(time.time()-start)}s',flush=True)
print('Local Dutch translation complete.',flush=True)
