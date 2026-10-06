#!/bin/sh
set -eu

repo_root=$(CDPATH='' cd -- "$(dirname -- "$0")/.." && pwd -P)
target=$repo_root/packages/coding-agent/scripts/quota-checker

if [ ! -x "$target" ]; then
	echo "link-quota-checker: wrapper ausente ou não executável: $target" >&2
	exit 1
fi

global_bin=$(bun pm -g bin 2>/dev/null || true)
if [ -z "$global_bin" ]; then
	global_bin=${BUN_INSTALL:-$HOME/.bun}/bin
fi

mkdir -p "$global_bin"
ln -sfn "$target" "$global_bin/quota-checker"
echo "link-quota-checker: $global_bin/quota-checker -> $target"
