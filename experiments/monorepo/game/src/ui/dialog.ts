import type { Choice, Page, Room } from "../data/rooms";

// 대화창은 canvas 위에 HTML로 올린다. 글꼴과 줄바꿈, 근거 링크를 브라우저에 맡기기 위해서다
export class Dialog {
  private readonly box: HTMLDivElement;
  private readonly hint: HTMLDivElement;
  private room: Room | null = null;
  private pages: Page[] = [];
  private notes = 0; // 방 설명 앞에 붙인 쪽 수
  private page = 0;
  private selected = 0;
  private result: Page | null = null; // 고른 뒤 보여 주는 결과
  onChoose: (roomId: string, choice: Choice) => void = () => {};

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
    return this.room ? { id: this.room.id, page: this.page - this.notes } : null;
  }

  showHint(title: string | null) {
    this.hint.textContent = title ? `${title} · [Space] 살펴보기` : "";
    this.hint.classList.toggle("visible", title !== null && !this.isOpen);
  }

  open(room: Room, notes: Page[] = []) {
    this.room = room;
    this.pages = [...notes, ...room.pages];
    this.notes = notes.length;
    this.page = 0;
    this.selected = 0;
    this.result = null;
    this.hint.classList.remove("visible");
    this.render();
  }

  // 선택지를 옮긴다. 고르는 쪽이 아니면 아무 일도 하지 않는다
  move(step: number) {
    const choices = this.choosing;
    if (!choices) return;
    this.selected = (this.selected + step + choices.length) % choices.length;
    this.render();
  }

  // 고르는 쪽이면 결정하고, 아니면 다음 쪽으로 넘긴다. 마지막 쪽이면 닫는다
  next() {
    if (!this.room) return;
    if (this.choosing) {
      this.pick(this.selected);
      return;
    }
    this.result = null;
    if (this.page + 1 < this.pages.length) {
      this.page += 1;
      this.render();
    } else {
      this.close();
    }
  }

  close() {
    this.room = null;
    this.result = null;
    this.box.classList.remove("visible");
  }

  private get choosing() {
    return this.room && !this.result ? this.pages[this.page].choices : undefined;
  }

  private pick(index: number) {
    const choice = this.choosing![index];
    this.result = typeof choice.result === "function" ? choice.result() : choice.result;
    this.onChoose(this.room!.id, choice);
    this.render();
  }

  private renderChoices(choices: Choice[]) {
    const row = document.createElement("div");
    row.className = "choices";
    choices.forEach((choice, index) => {
      const item = document.createElement("div");
      item.className = index === this.selected ? "choice selected" : "choice";
      if (choice.swatch) {
        const swatch = document.createElement("span");
        swatch.className = "swatch";
        swatch.style.background = choice.swatch;
        item.append(swatch);
      }
      item.append(choice.label);
      item.addEventListener("click", () => this.pick(index));
      row.append(item);
    });
    return row;
  }

  private render() {
    const room = this.room!;
    const page = this.result ?? this.pages[this.page];
    const title = document.createElement("div");
    title.className = "title";
    title.textContent = room.title;
    const text = document.createElement("div");
    text.className = "text";
    text.textContent = page.text;
    const term = document.createElement("div");
    term.className = "term";
    term.textContent = page.term;
    const parts: HTMLElement[] = [title, text];
    if (page.why) {
      const why = document.createElement("div");
      why.className = "why";
      why.textContent = `왜 그럴까요? ${page.why}`;
      parts.push(why);
    }
    if (page.choices) parts.push(this.renderChoices(page.choices));
    parts.push(term);
    const foot = document.createElement("div");
    foot.className = "foot";
    const link = document.createElement("a");
    const evidence = page.evidence ?? room.evidence;
    link.href = evidence.url;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = `근거 보기 ${evidence.label}`;
    const more = document.createElement("span");
    const last = this.page + 1 === this.pages.length;
    const action = page.choices ? "[←→] 고르기 · [Space] 결정" : `[Space] ${last ? "닫기" : "다음"}`;
    more.textContent = `${this.page + 1} / ${this.pages.length} · ${action}`;
    foot.append(link, more);
    this.box.replaceChildren(...parts, foot);
    this.box.classList.add("visible");
  }
}
