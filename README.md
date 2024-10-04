# Explain Diff with AI action

This action receives as input a git diff (e.g. a PR diff) and asks a LLM to summarize and explain the changes made in that diff.

## Inputs

### `diff`

**Required** The diff to be explained.

### `apikey`

**Required** Your OpenAI api key. See "[OpenAI API](https://openai.com/api/)"

### Optional parameters are:
- `baseUrl`: The base url of the OpenAI compatible LLM
- `model`: LLM  used for explaining the diff
- `maxTokens`: Maximum number of tokens expected from the LLM
- `temperature`: The temperature parameter passed to the LLM
- `prompt`: Instruction for the LLM to explain the diff

## Outputs

### `explanation`

The explanation from the LLM

## Example usage

### To explain the changes made in a PR
```yaml
name: Explain PR

on:
  pull_request:
    types: [opened, synchronize]

env:
  DIFF: ${{ compare(github.base_ref, github.head_ref) }}

jobs:
  explain-diff:
    runs-on: ubuntu-latest

    steps:
    - name: Explain Diff
      id: explain
      uses: oroszgy/explain-diff-with-ai@main
      with:
        diff: ${{ env.DIFF }}
        apikey: ${{ secrets.OPENAI_APIKEY }}
```