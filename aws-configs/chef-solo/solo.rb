file_cache_path    "/var/chef/cache"
file_backup_path   "/var/chef/backup"
cookbook_path ["/tmp/chef-guardant-health/cookbooks"]
data_bag_path ["/tmp/chef-guardant-health/data_bags"]
if Chef::VERSION.to_f < 11.8
  role_path nil
else
  role_path []
end
log_level :info
verbose_logging    false

encrypted_data_bag_secret nil





http_proxy nil
http_proxy_user nil
http_proxy_pass nil
https_proxy nil
https_proxy_user nil
https_proxy_pass nil
no_proxy nil
