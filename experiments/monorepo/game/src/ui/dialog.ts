import type { Room } from "../data/rooms";

// 대화창은 canvas 위에 HTML로 올린다. 글꼴과 줄바꿈, 근거 링크를 브라우저에 맡기기 위해서다
export class Dialog {
  private readonly box: HTMLDivElement;
  private readonly hint: HTMLDivElement;
  private room: Room | null = null;
  private page = 0;

  constructor(parent: HTMLElement) {
    this.hint = document.createElement("div");
    this.hint.className = "hint";
    this.box = document.createElement("div");
    this.box.className = "dialog";
    parent.append(this.hint, this.box);
  }

  get isOpen() {
    return this.room !== null;
  }

  // 지금 보여 주는 방과 쪽 번호. 연출을 맞추는 데 쓴다
  get current() {
    return this.room ? { id: this.room.id, page: this.page } : null;
  }

  showHint(title: string | null) {
    this.hint.textContent = title ? `${title} · [Space] 살펴보기` : "";
    this.hint.classList.toggle("visible", title !== null && !this.isOpen);
  }

  open(room: Room) {
    this.room = room;
    this.page = 0;
    this.hint.classList.remove("visible");
    this.render();
  }

  // 다음 쪽으로 넘긴다. 마지막 쪽이면 닫는다
  next() {
    if (!this.room) return;
    if (this.page + 1 < this.room.pages.length) {
      this.page += 1;
      this.render();
    } else {
      this.close();
    }
  }

  close() {
    this.room = null;
    this.box.classList.remove("visible");
  }

  private render() {
    const room = this.room!;
    const page = room.pages[this.page];
    const title = document.createElement("div");
    title.className = "title";
    title.textContent = room.title;
    const text = document.createElement("div");
    text.className = "text";
    text.textContent = page.text;
    const term = document.createElement("div");
    term.className = "term";
    term.textContent = page.term;
    const foot = document.createElement("div");
    foot.className = "foot";
    const link = document.createElement("a");
    link.href = room.evidence.url;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = `근거 보기 ${room.evidence.label}`;
    const more = document.createElement("span");
    const last = this.page + 1 === room.pages.length;
    more.textContent = `${this.page + 1} / ${room.pages.length} · [Space] ${last ? "닫기" : "다음"}`;
    foot.append(link, more);
    this.box.replaceChildren(title, text, term, foot);
    this.box.classList.add("visible");
  }
}
