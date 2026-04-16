/**
 * Minimal, dependency-free ZIP writer — "stored" (no compression) entries only.
 *
 * Good enough for shipping a handful of text files (a skill bundle) without
 * pulling `jszip`/`adm-zip` into the dependency graph. Implements just the
 * parts of the APPNOTE.TXT spec we need: local file headers, central directory,
 * and the end-of-central-directory record.
 */

let crcTable = null;
function crc32(bytes) {
  if (!crcTable) {
    const table = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let k = 0; k < 8; k++) {
        c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      }
      table[i] = c >>> 0;
    }
    crcTable = table;
  }
  let c = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) {
    c = crcTable[(c ^ bytes[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

/**
 * @param {{ name: string, content: string | Uint8Array }[]} files
 * @returns {Uint8Array}
 */
export function buildZip(files) {
  const encoder = new TextEncoder();
  const chunks = [];
  const central = [];
  let offset = 0;

  for (const file of files) {
    const nameBytes = encoder.encode(file.name);
    const data =
      typeof file.content === "string" ? encoder.encode(file.content) : file.content;
    const crc = crc32(data);
    const size = data.length;

    const lh = new ArrayBuffer(30);
    const lv = new DataView(lh);
    lv.setUint32(0, 0x04034b50, true);
    lv.setUint16(4, 20, true);
    lv.setUint16(6, 0, true);
    lv.setUint16(8, 0, true);
    lv.setUint16(10, 0, true);
    lv.setUint16(12, 0, true);
    lv.setUint32(14, crc, true);
    lv.setUint32(18, size, true);
    lv.setUint32(22, size, true);
    lv.setUint16(26, nameBytes.length, true);
    lv.setUint16(28, 0, true);
    chunks.push(new Uint8Array(lh), nameBytes, data);

    const ch = new ArrayBuffer(46);
    const cv = new DataView(ch);
    cv.setUint32(0, 0x02014b50, true);
    cv.setUint16(4, 20, true);
    cv.setUint16(6, 20, true);
    cv.setUint16(8, 0, true);
    cv.setUint16(10, 0, true);
    cv.setUint16(12, 0, true);
    cv.setUint16(14, 0, true);
    cv.setUint32(16, crc, true);
    cv.setUint32(20, size, true);
    cv.setUint32(24, size, true);
    cv.setUint16(28, nameBytes.length, true);
    cv.setUint16(30, 0, true);
    cv.setUint16(32, 0, true);
    cv.setUint16(34, 0, true);
    cv.setUint16(36, 0, true);
    cv.setUint32(38, 0, true);
    cv.setUint32(42, offset, true);
    central.push(new Uint8Array(ch), nameBytes);

    offset += 30 + nameBytes.length + size;
  }

  const centralStart = offset;
  const centralSize = central.reduce((acc, part) => acc + part.length, 0);
  for (const part of central) chunks.push(part);

  const eocd = new ArrayBuffer(22);
  const ev = new DataView(eocd);
  ev.setUint32(0, 0x06054b50, true);
  ev.setUint16(4, 0, true);
  ev.setUint16(6, 0, true);
  ev.setUint16(8, files.length, true);
  ev.setUint16(10, files.length, true);
  ev.setUint32(12, centralSize, true);
  ev.setUint32(16, centralStart, true);
  ev.setUint16(20, 0, true);
  chunks.push(new Uint8Array(eocd));

  const total = chunks.reduce((acc, part) => acc + part.length, 0);
  const output = new Uint8Array(total);
  let cursor = 0;
  for (const part of chunks) {
    output.set(part, cursor);
    cursor += part.length;
  }
  return output;
}
