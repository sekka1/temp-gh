require_relative '../../../kitchen/data/spec_helper'

describe 'binary-lxc' do
  it_behaves_like 'a basic docker installation'
  it_behaves_like 'a docker container test environment'
  it_behaves_like 'a docker image test environment'
end
