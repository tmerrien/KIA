#!/usr/bin/env bash
# Before/after eval: words-per-answer vs. key-term recall, baseline vs. precise style.
# Usage: [STYLE=path.md] [OUT=results.tsv] [ANS=dir] evals/run.sh [prompts.jsonl]   Requires: claude CLI, jq.
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
prompts="${1:-$here/prompts.jsonl}"
style="$(awk 'f>=2; /^---$/{f++}' "${STYLE:-$here/../output-styles/precise.md}")"
out="${OUT:-$here/results.tsv}"
ans="${ANS:-}"   # optional dir: save each answer as <id>.<variant>.md
[ -n "$ans" ] && mkdir -p "$ans"
printf 'id\tvariant\twords\trecall\n' > "$out"

score() { # $1=answer $2=json array of terms -> "words<TAB>recall"
  local words hits=0 n
  words=$(wc -w <<<"$1" | tr -d ' ')
  n=$(jq 'length' <<<"$2")
  while IFS= read -r t; do
    grep -qiF -- "$t" <<<"$1" && hits=$((hits+1))
  done < <(jq -r '.[]' <<<"$2")
  printf '%s\t%s' "$words" "$(awk -v h=$hits -v n=$n 'BEGIN{printf "%.2f", n?h/n:1}')"
}

while IFS= read -r line; do
  id=$(jq -r .id <<<"$line"); p=$(jq -r .prompt <<<"$line"); terms=$(jq -c .must_include <<<"$line")
  base=$(claude -p "$p" </dev/null)
  prec=$(claude -p --append-system-prompt "$style" "$p" </dev/null)
  [ -n "$ans" ] && { printf '%s\n' "$base" > "$ans/$id.baseline.md"; printf '%s\n' "$prec" > "$ans/$id.precise.md"; }
  printf '%s\tbaseline\t%s\n' "$id" "$(score "$base" "$terms")" >> "$out"
  printf '%s\tprecise\t%s\n'  "$id" "$(score "$prec" "$terms")" >> "$out"
done < "$prompts"

awk -F'\t' 'NR>1{w[$2]+=$3; r[$2]+=$4; c[$2]++}
  END{for(v in w) printf "%-9s words=%.0f recall=%.2f\n", v, w[v]/c[v], r[v]/c[v]}' "$out"
