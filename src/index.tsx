import { GM } from "$";
import { render } from "solid-js/web";
import Modal from "./Modal";

window.addEventListener("load", () => {
  const container: any = document.querySelector(".container");
  const vue = container.__vue__;
  vue.craftApi = async (...args: any[]) => {
    const recipe = [args[0], args[1]].sort((a, b) => a.localeCompare(b));
    const urlUnreplaced =
      (await GM.getValue("private-server-url")) ||
      "https://neal.fun/api/infinite-craft/pair?first={first}&second={second}";
    const controller = new AbortController();
    const url = urlUnreplaced
      .replace("{first}", encodeURIComponent(recipe[0]))
      .replace("{second}", encodeURIComponent(recipe[1]));
    vue.$setTimeout(() => controller.abort(), 12e3);
    try {
      const response = await fetch(url, { signal: controller.signal });
      const data = await response.json();
      let { result, emoji, isNew } = data;
      result = result.trim();
      if (result !== "Nothing" && result !== "") {
        const returnValue: any = { text: result, emoji };
        isNew && (returnValue.discovery = true);
        return returnValue;
      }
    } catch {}
    return null;
  };
  render(
    () => <Modal />,
    document.querySelector(".side-controls")!.parentNode!
  );
  const button = document
    .querySelector(".tool-icon")
    ?.cloneNode() as HTMLImageElement;
  if (!button) return;

  button.src =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyZW0iIGhlaWdodD0iMmVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjwhLS0gSWNvbiBmcm9tIE1hdGVyaWFsIFN5bWJvbHMgTGlnaHQgYnkgR29vZ2xlIC0gaHR0cHM6Ly9naXRodWIuY29tL2dvb2dsZS9tYXRlcmlhbC1kZXNpZ24taWNvbnMvYmxvYi9tYXN0ZXIvTElDRU5TRSAtLT48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik00LjYxNiAyMHEtLjY5MSAwLTEuMTUzLS40NjJUMyAxOC4zODRWNS42MTZxMC0uNjkxLjQ2My0xLjE1M1Q0LjYxNSA0aDQuNTc3cS42OSAwIDEuMTUzLjQ2M3QuNDYzIDEuMTUzdjEyLjc2OXEwIC42OS0uNDYzIDEuMTUzVDkuMTkyIDIwem0xMC4xOTIgMHEtLjY5IDAtMS4xNTMtLjQ2MnQtLjQ2My0xLjE1M1Y1LjYxNXEwLS42OS40NjMtMS4xNTJUMTQuODA4IDRoNC41NzdxLjY5IDAgMS4xNTIuNDYzVDIxIDUuNjE2djEyLjc2OXEwIC42OS0uNDYzIDEuMTUzVDE5LjM4NSAyMHpNNC42MTYgMTloNC41NzZxLjI3IDAgLjQ0My0uMTczdC4xNzMtLjQ0MlY1LjYxNXEwLS4yNjktLjE3NC0uNDQyUTkuNDYyIDUgOS4xOTIgNUg0LjYxNnEtLjI3IDAtLjQ0My4xNzNUNCA1LjYxNnYxMi43NjlxMCAuMjY5LjE3My40NDJ0LjQ0My4xNzNtMTAuMTkyIDBoNC41NzdxLjI2OSAwIC40NDItLjE3M3QuMTczLS40NDJWNS42MTVxMC0uMjY5LS4xNzMtLjQ0MlQxOS4zODUgNWgtNC41NzdxLS4yNyAwLS40NDMuMTczdC0uMTczLjQ0M3YxMi43NjlxMCAuMjY5LjE3My40NDJ0LjQ0My4xNzNtLTYuNDIzLTUuMTE1cTAtLjIxNC0uMTQ0LS4zNTdxLS4xNDMtLjE0NC0uMzU2LS4xNDRoLTJxLS4yMTQgMC0uMzU3LjE0NHEtLjE0My4xNDMtLjE0My4zNTdxMCAuMjEzLjE0My4zNTZxLjE0My4xNDQuMzU3LjE0NGgycS4yMTMgMCAuMzU2LS4xNDR0LjE0NC0uMzU2bTEwLjIzIDBxMC0uMjE0LS4xNDMtLjM1N3EtLjE0My0uMTQ0LS4zNTYtLjE0NGgtMi4wMnEtLjIxMyAwLS4zNDcuMTQ0cS0uMTMzLjE0My0uMTMzLjM1N3EwIC4yMTMuMTQzLjM1NnQuMzU3LjE0NGgycS4yMTMgMCAuMzU2LS4xNDRxLjE0NC0uMTQzLjE0NC0uMzU2TTguMzg1IDExLjA3N3EwLS4yMTMtLjE0NC0uMzU3dC0uMzU2LS4xNDNoLTJxLS4yMTQgMC0uMzU3LjE0M3EtLjE0My4xNDQtLjE0My4zNTd0LjE0My4zNTd0LjM1Ny4xNDNoMnEuMjEzIDAgLjM1Ni0uMTQzdC4xNDQtLjM1N20xMC4yMyAwcTAtLjIxMy0uMTQzLS4zNTdxLS4xNDMtLjE0My0uMzU2LS4xNDNoLTIuMDJxLS4yMTMgMC0uMzQ3LjE0M3EtLjEzMy4xNDQtLjEzMy4zNTd0LjE0My4zNTd0LjM1Ny4xNDNoMnEuMjEzIDAgLjM1Ni0uMTQzcS4xNDQtLjE0My4xNDQtLjM1N004LjM4NSA4LjI1cTAtLjIxMy0uMTQ0LS4zNTd0LS4zNTYtLjE0M2gtMnEtLjIxNCAwLS4zNTcuMTQzcS0uMTQzLjE0NC0uMTQzLjM1N3QuMTQzLjM1N3QuMzU3LjE0M2gycS4yMTMgMCAuMzU2LS4xNDN0LjE0NC0uMzU3bTEwLjIzIDBxMC0uMjEzLS4xNDMtLjM1N3EtLjE0My0uMTQzLS4zNTYtLjE0M2gtMi4wMnEtLjIxMyAwLS4zNDcuMTQzcS0uMTMzLjE0NC0uMTMzLjM1N3QuMTQzLjM1N3QuMzU3LjE0M2gycS4yMTMgMCAuMzU2LS4xNDNxLjE0NC0uMTQzLjE0NC0uMzU3TTQuNjE2IDE5SDRoNS44MDh6bTEwLjE5MiAwaC0uNjE2SDIweiIvPjwvc3ZnPg==";
  button.setAttribute("class", "tool-icon");
  button.addEventListener("click", () => {
    const modal = document.getElementById(
      "private-server-modal"
    ) as HTMLDialogElement | null;
    if (!modal) return;
    modal.showModal();
  });
  document.querySelector(".side-controls")?.prepend(button);
});
